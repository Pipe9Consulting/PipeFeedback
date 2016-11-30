using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using FontSize = DocumentFormat.OpenXml.Spreadsheet.FontSize;

namespace ExcelGenerator
{
    public class ExcelReportGenerator
    {
        // Lookup for Excel column reference prefixes
        private static string[] ExcelColumnReferenceLookup =
        {
            "A"
           
        };

        // The default template document is loaded from an Excel file (styles.xlsx) that
        // is stored as an embedded resource in this assembly. This document has been
        // prepared ahead of time by styling cell A1 as a number, A2 as currency, and
        // so on.
        private static byte[] DefaultTemplateDocument = null;

        private const string DefaultTemplateDocumentName = "ExcelReportGenerator.styles.xlsx";

        // Default cells to use when user does not provide an Excel template file to use.
        // This list is created in the static constructor from the default template document.
        // Each index corresponds to a value in the CellType enumerated type (see below).
        private static List<Cell> DefaultTemplateCells = null;

        // These cell types correspond to the Cells in DefaultTemplateCells.
        private enum CellType
        {
            Number = 0,
            Currency = 1,
            Date = 2,
            DateTime = 3,
            Time = 4,
            Percentage = 5,
            Text = 6
        }

        static ExcelReportGenerator()
        {
            ExcelReportGenerator.InitializeDefaultDocument();
        }

        private static void InitializeDefaultDocument()
        {
            if (DefaultTemplateCells != null)
            { return; }

            DefaultTemplateCells = new List<Cell>();

            Stream stylesDocument =
                Assembly.GetExecutingAssembly().GetManifestResourceStream(ExcelReportGenerator.DefaultTemplateDocumentName);
            stylesDocument.Position = 0;

            DefaultTemplateDocument = new byte[stylesDocument.Length];
            stylesDocument.Read(DefaultTemplateDocument, 0, (int)stylesDocument.Length);

            stylesDocument.Position = 0;

            using (SpreadsheetDocument ssDoc = SpreadsheetDocument.Open(stylesDocument, false))
            {
                WorkbookPart workbookPart = ssDoc.WorkbookPart;
                Sheet worksheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault();
                WorksheetPart wsPart = (WorksheetPart)workbookPart.GetPartById(worksheet.Id);
                Row tRow = wsPart.Worksheet.Descendants<Row>().
                    Where(r => r.RowIndex == 1).FirstOrDefault();
                int cnt = tRow.Count();

                for (int i = 0; i < cnt; i++)
                {
                    Cell c = (Cell)tRow.ElementAt(i);
                    ExcelReportGenerator.DefaultTemplateCells.Add(c);
                }
            }

            stylesDocument.Close();
            stylesDocument = null;
        }

        #region Public report generation methods

        /// <summary>
        /// Generate Excel report from array of object arrays. Generated cells
        /// are treated as text and no column headers are produced.
        /// </summary>
        /// <param name="inputData">Array of object arrays</param>
        /// <returns>MemoryStream containing Excel report</returns>
        public static MemoryStream GenerateReport(object[][] inputData)
        {
            MemoryStream ms = new MemoryStream();
            using (SpreadsheetDocument ssDoc =
                ExcelReportGenerator.CreateNewSpreadsheetDocumentInMemory(ms))
            {
                ExcelReportGenerator.OutputRawData(inputData, ssDoc, "Sheet1");
            }
            return ms;
        }

        /// <summary>
        /// Generate Excel report from array of object arrays. Generated cells
        /// are treated as text and no column headers are produced.
        /// </summary>
        /// <param name="inputData">Array of object arrays</param>
        /// <param name="outputFile">Filename for report output</param>
        public static void GenerateReport(object[][] inputData, string outputFile)
        {
            using (SpreadsheetDocument ssDoc =
                ExcelReportGenerator.CreateNewSpreadsheetDocument(outputFile))
            {
                ExcelReportGenerator.OutputRawData(inputData, ssDoc, "Sheet1");
            }
        }

        /// <summary>
        /// Generate Excel report from array of object arrays by using a provided
        /// Excel template file. Generated cells will use actual cells from the template
        /// file to provide styling to output report.
        /// </summary>
        /// <param name="inputData">Array of object arrays</param>
        /// <param name="templateFile">Filename of Excel file to use as template</param>
        /// <param name="templateCellsRow">Excel row where template cells are defined for each column</param>
        /// <returns>MemoryStream containing Excel report</returns>
        public static MemoryStream GenerateReport(object[][] inputData, string templateFile, int templateCellsRow)
        {
            MemoryStream ms = new MemoryStream();
            ms = Utility.LoadFile(templateFile);

            using (SpreadsheetDocument ssDoc = SpreadsheetDocument.Open(ms, true))
            {
                ExcelReportGenerator.OutputTemplatedData(inputData, ssDoc, templateCellsRow, "Sheet1");
            }

            return ms;
        }

        /// <summary>
        /// Generate Excel report from DataTable.
        /// </summary>
        /// <param name="dataTable">DataTable containing data for report</param>
        /// <returns>MemoryStream containing Excel report</returns>
        public static MemoryStream GenerateReport(DataTable dataTable)
        {
            MemoryStream ms = new MemoryStream();
            ms.Write(ExcelReportGenerator.DefaultTemplateDocument, 0, ExcelReportGenerator.DefaultTemplateDocument.Length);
            ms.Position = 0;

            using (SpreadsheetDocument ssDoc = SpreadsheetDocument.Open(ms, true))
            {
                OutputRawData(dataTable, ssDoc, "Sheet1");
            }

            return ms;
        }

        public static MemoryStream GenerateReport(GridView dataTable, string templateFile, string sheetName)
        {
            MemoryStream ms = new MemoryStream();
            //   ms.Write(ExcelReportGenerator.DefaultTemplateDocument, 0, ExcelReportGenerator.DefaultTemplateDocument.Length);
            // ms.Position = 0;
            ms = Utility.LoadFile(templateFile);

            using (SpreadsheetDocument ssDoc = SpreadsheetDocument.Open(ms, true))
            {
                OutputRawData(dataTable, ssDoc, sheetName);
            }

            return ms;
        }

        /// <summary>
        /// Generate Excel report from DataTable by using a provided
        /// Excel template file.
        /// </summary>
        /// <param name="dataTable">DataTable containing data for report</param>
        /// <param name="templateFile">Filename of Excel file to use as template</param>
        /// <param name="templateCellsRow">Excel row where template cells are defined for each column</param>
        /// <returns>MemoryStream containing Excel report</returns>
        public static MemoryStream GenerateReport(DataTable dataTable, string templateFile, int templateCellsRow, string sheetName)
        {
            MemoryStream ms = new MemoryStream();
            ms = Utility.LoadFile(templateFile);

            using (SpreadsheetDocument ssDoc = SpreadsheetDocument.Open(ms, true))
            {
                ExcelReportGenerator.OutputTemplatedData(dataTable, ssDoc, templateCellsRow, sheetName);
            }

            return ms;
        }

        /// <summary>
        /// Generate Excel report from array of DataTables by using a provided Excel template file.
        /// </summary>
        /// <param name="dataTables">Array of DataTable containing data for report</param>
        /// <param name="templateFile">Filename of Excel file to use as template. Sheets correspond (in order) to DataTables</param>
        /// <param name="templateCellsRow">Array of Excel row numbers where template cells are defined for each column</param>
        /// <returns></returns>
        public static MemoryStream GenerateReport(DataTable[] dataTables, string templateFile, int[] templateCellsRow)
        {
            MemoryStream ms = new MemoryStream();
            ms = Utility.LoadFile(templateFile);

            using (SpreadsheetDocument ssDoc = SpreadsheetDocument.Open(ms, true))
            {
                WorkbookPart workbookPart = ssDoc.WorkbookPart;
                List<Sheet> templateSheets = (from s in workbookPart.Workbook.Descendants<Sheet>()
                                              select s).ToList();

                for (int i = 0; i < dataTables.Length; i++)
                {
                    //TODO: this method really needs to be simplified!!!
                    Sheet worksheet = workbookPart.Workbook.Descendants<Sheet>().ToArray()[i];
                    WorksheetPart wsPart = (WorksheetPart)workbookPart.GetPartById(worksheet.Id);

                    Row tRow = wsPart.Worksheet.Descendants<Row>().
                            Where(r => r.RowIndex == templateCellsRow[i]).FirstOrDefault();
                    int cnt = tRow.Count(); //First row of templateFile is used to get column count "cnt"
                    List<Cell> cellLookup = new List<Cell>();
                    for (int j = 0; j < cnt; j++)
                    {
                        Cell c = (Cell)tRow.ElementAt(j);
                        cellLookup.Add((Cell)c.CloneNode(true));
                    }

                    SheetData sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();

                    int currRowIndex = templateCellsRow[i];
                    for (int j = 0; j < dataTables[i].Rows.Count; j++)
                    {
                        Row newRow = new Row();
                        newRow.RowIndex = (UInt32)(currRowIndex);

                        //DataTable columns must match templateFile columns, if there is an out of index error the datatable columns were likely updated causing a mismatch
                        for (int k = 0; k < dataTables[i].Columns.Count; k++)
                        {
                            int styleIndex = -1;
                            if (((Cell)cellLookup[k]).StyleIndex != null)
                            {
                                styleIndex = (int)(((Cell)cellLookup[k]).StyleIndex.Value);
                            }
                            Cell newCell = ExcelReportGenerator.CreateCellBasedOnType(dataTables[i].Rows[j][k],
                                    ExcelColumnReferenceLookup[k] + currRowIndex,
                                    styleIndex, ssDoc);

                            newRow.AppendChild(newCell);
                        }

                        sheetData.AppendChild(newRow);
                        currRowIndex++;
                    }
                }
            }

            return ms;
        }

        #endregion Public report generation methods

        #region Generating spreadsheets from scratch

        private static SpreadsheetDocument CreateNewSpreadsheetDocument(string filename)
        {
            SpreadsheetDocument ssDoc =
                SpreadsheetDocument.Create(filename, SpreadsheetDocumentType.Workbook);
            AddBasePartsToSpreadsheetDocument(ssDoc);
            return ssDoc;
        }

        private static SpreadsheetDocument CreateNewSpreadsheetDocumentInMemory(MemoryStream ms)
        {
            SpreadsheetDocument ssDoc =
                SpreadsheetDocument.Create(ms, SpreadsheetDocumentType.Workbook);
            AddBasePartsToSpreadsheetDocument(ssDoc);
            return ssDoc;
        }

        private static void AddBasePartsToSpreadsheetDocument(SpreadsheetDocument ssDoc)
        {
            // Add a WorkbookPart to the document.
            WorkbookPart workbookPart = ssDoc.AddWorkbookPart();
            workbookPart.Workbook = new Workbook();

            // Add a WorksheetPart to the WorkbookPart.
            WorksheetPart wsPart = workbookPart.AddNewPart<WorksheetPart>();
            wsPart.Worksheet = new Worksheet(new SheetData());

            // Add Sheets to the Workbook.
            Sheets sheets = ssDoc.WorkbookPart.Workbook.AppendChild<Sheets>(new Sheets());

            // Append a new worksheet and associate it with the workbook.
            Sheet sheet = new Sheet() { Id = ssDoc.WorkbookPart.GetIdOfPart(wsPart), SheetId = 1, Name = "Sheet1" };
            sheets.Append(sheet);
        }

        #endregion Generating spreadsheets from scratch

        private static SheetData GetSheetData(SpreadsheetDocument ssDoc, string sheetName)
        {
            WorkbookPart workbookPart = ssDoc.WorkbookPart;
            Sheet worksheet = workbookPart.Workbook.Descendants<Sheet>().
                Where(s => s.Name == sheetName).FirstOrDefault();
            WorksheetPart wsPart = (WorksheetPart)workbookPart.GetPartById(worksheet.Id);
            SheetData sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();

            return sheetData;
        }

        private static void OutputRawData(GridView dataTable, SpreadsheetDocument ssDoc, string sheetName)
        {
            SheetData sheetData = ExcelReportGenerator.GetSheetData(ssDoc, sheetName);

            ssDoc.WorkbookPart.WorkbookStylesPart.Stylesheet = GenerateStyleSheet();

            int currRowIndex = 1;
            foreach (System.Web.UI.WebControls.GridViewRow gridViewRow in dataTable.Controls[0].Controls)
            {
                if (gridViewRow.RowType != DataControlRowType.Footer)
                {
                    Row newRow = new Row();
                    newRow.RowIndex = (UInt32)currRowIndex;

                    int colIndex = 0;
                    foreach (System.Web.UI.WebControls.TableCell gTableCell in gridViewRow.Cells)
                    {
                        Cell newCell = ExcelReportGenerator.CreateTextCell(gTableCell.Text, ExcelColumnReferenceLookup[colIndex] + currRowIndex);
                        if (gridViewRow.RowType == DataControlRowType.Header)
                        {
                            newCell.StyleIndex = 7;
                        }

                        colIndex = colIndex + (gTableCell.ColumnSpan > 0 ? gTableCell.ColumnSpan - 1 : 0);
                        newRow.AppendChild(newCell);
                        colIndex++;
                    }
                    sheetData.AppendChild(newRow);
                    currRowIndex++;
                }
            }

            int mergRowIndex = 1;
            Worksheet worksheet = GetWorksheet(ssDoc, sheetName);
            foreach (System.Web.UI.WebControls.GridViewRow gridViewRow in dataTable.Controls[0].Controls)
            {
                int colIndex = 0;

                foreach (System.Web.UI.WebControls.TableCell gTableCell in gridViewRow.Cells)
                {
                    int colSpn = gTableCell.ColumnSpan > 0 ? gTableCell.ColumnSpan - 1 : 0;
                    if (colSpn != 0)
                    {
                        MergeCells mergeCells;

                        if (worksheet.Elements<MergeCells>().Count() > 0)
                            mergeCells = worksheet.Elements<MergeCells>().First();
                        else
                        {
                            mergeCells = new MergeCells();

                            // Insert a MergeCells object into the specified position.
                            if (worksheet.Elements<CustomSheetView>().Count() > 0)
                                worksheet.InsertAfter(mergeCells, worksheet.Elements<CustomSheetView>().First());
                            else
                                worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetData>().First());
                        }

                        // Create the merged cell and append it to the MergeCells collection.
                        MergeCell mergeCell = new MergeCell()
                        {
                            Reference =
                                new StringValue(ExcelColumnReferenceLookup[colIndex] +
                                                mergRowIndex + ":" +
                                                ExcelColumnReferenceLookup[
                                                    colIndex + colSpn] +
                                                mergRowIndex)
                        };

                        mergeCells.Append(mergeCell);
                        worksheet.Save();
                    }
                    colIndex = colIndex + colSpn;
                    colIndex++;
                }
            }
        }

        private static void OutputRawData(object[][] inputData, SpreadsheetDocument ssDoc, string sheetName)
        {
            SheetData sheetData = ExcelReportGenerator.GetSheetData(ssDoc, sheetName);

            int currRowIndex = 1;
            for (int i = 0; i < inputData.GetLength(0); i++)
            {
                Row newRow = new Row();
                newRow.RowIndex = (UInt32)(currRowIndex);

                for (int j = 0; j < inputData[i].Count(); j++)
                {
                    Cell newCell = ExcelReportGenerator.CreateInlineTextCell(
                        inputData[i][j].ToString(), ExcelColumnReferenceLookup[j] + currRowIndex);

                    newRow.AppendChild(newCell);
                }

                sheetData.AppendChild(newRow);
                currRowIndex++;
            }
        }

        private static void OutputRawData(DataTable dataTable, SpreadsheetDocument ssDoc, string sheetName)
        {
            SheetData sheetData = ExcelReportGenerator.GetSheetData(ssDoc, sheetName);

            int currRowIndex = 1;

            Row headerRow = new Row();
            headerRow.RowIndex = (UInt32)currRowIndex;
            for (int colIndex = 0; colIndex < dataTable.Columns.Count; colIndex++)
            {
                Cell newCell = ExcelReportGenerator.CreateInlineTextCell(
                    dataTable.Columns[colIndex].ColumnName, ExcelColumnReferenceLookup[colIndex] + currRowIndex);
                headerRow.AppendChild(newCell);
            }
            currRowIndex++;
            sheetData.AppendChild(headerRow);

            for (int row = 0; row < dataTable.Rows.Count; row++)
            {
                Row newRow = new Row();
                newRow.RowIndex = (UInt32)currRowIndex;
                for (int colIndex = 0; colIndex < dataTable.Columns.Count; colIndex++)
                {
                    CellType ct = ExcelReportGenerator.DetermineCellType(dataTable.Rows[row][colIndex]);
                    int styleIndex = (int)(ExcelReportGenerator.DefaultTemplateCells[(int)ct].StyleIndex.Value);

                    object currObj = dataTable.Rows[row][colIndex];
                    if (dataTable.Rows[row][colIndex] is DBNull)
                    {
                        currObj = "NULL";
                    }
                    Cell newCell = ExcelReportGenerator.CreateCellBasedOnType(currObj,
                            ExcelColumnReferenceLookup[colIndex] + currRowIndex,
                            styleIndex, ssDoc);

                    newRow.AppendChild(newCell);
                }
                sheetData.AppendChild(newRow);
                currRowIndex++;
            }
        }

        private static void OutputTemplatedData(object[][] inputData, SpreadsheetDocument ssDoc, int templateCellsRow, string sheetName)
        {
            WorkbookPart workbookPart = ssDoc.WorkbookPart;
            Sheet worksheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault();
            WorksheetPart wsPart = (WorksheetPart)workbookPart.GetPartById(worksheet.Id);

            Row tRow = wsPart.Worksheet.Descendants<Row>().
                Where(r => r.RowIndex == templateCellsRow).FirstOrDefault();
            int cnt = tRow.Count();
            List<Cell> cellLookup = new List<Cell>();
            for (int i = 0; i < cnt; i++)
            {
                Cell c = (Cell)tRow.ElementAt(i);
                cellLookup.Add(c);
            }

            //var styles = workbookPart.GetPartsOfType<WorkbookStylesPart>().FirstOrDefault();

            SheetData sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();

            int currRowIndex = templateCellsRow + 1;
            for (int i = 0; i < inputData.GetLength(0); i++)
            {
                Row newRow = new Row();
                newRow.RowIndex = (UInt32)(currRowIndex);

                for (int j = 0; j < inputData[i].Count(); j++)
                {
                    Cell newCell = (Cell)cellLookup[j].CloneNode(true);
                    newCell.CellReference = ExcelColumnReferenceLookup[j] + currRowIndex;

                    //newCell.DataType = CellValues.SharedString;
                    //int ssIndex = ExcelReportGenerator.InsertSharedStringItem(workbookPart, inputData[i][j].ToString());
                    //newCell.CellValue.Text = ssIndex.ToString();

                    newCell.DataType = CellValues.InlineString;
                    InlineString inlineString = new InlineString();
                    Text t = new Text();
                    t.Text = inputData[i][j].ToString();
                    inlineString.AppendChild(t);
                    newCell.AppendChild(inlineString);

                    newRow.AppendChild(newCell);
                }

                sheetData.AppendChild(newRow);
                currRowIndex++;
            }
        }

        private static void OutputTemplatedData(DataTable dataTable, SpreadsheetDocument ssDoc, int templateCellsRow, string sheetName)
        {
            WorkbookPart workbookPart = ssDoc.WorkbookPart;
            Sheet worksheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault();
            WorksheetPart wsPart = (WorksheetPart)workbookPart.GetPartById(worksheet.Id);

            Row tRow = wsPart.Worksheet.Descendants<Row>().FirstOrDefault();
            int cnt = tRow.Count();
            List<Cell> cellLookup = new List<Cell>();
            for (int i = 0; i < cnt; i++)
            {
                Cell c = (Cell)tRow.ElementAt(i);
                cellLookup.Add((Cell)c.CloneNode(true));
            }

            SheetData sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();

            //int currRowIndex = templateCellsRow + 1;
            int currRowIndex = templateCellsRow;
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                Row newRow = new Row();
                newRow.RowIndex = (UInt32)(currRowIndex);

                for (int j = 0; j < dataTable.Columns.Count; j++)
                {
                    int styleIndex = -1;
                    if (((Cell)cellLookup[j]).StyleIndex != null)
                    {
                        styleIndex = (int)(((Cell)cellLookup[j]).StyleIndex.Value);
                    }
                    Cell newCell = ExcelReportGenerator.CreateCellBasedOnType(dataTable.Rows[i][j],
                            ExcelColumnReferenceLookup[j] + currRowIndex,
                            styleIndex, ssDoc);

                    newRow.AppendChild(newCell);
                }

                sheetData.AppendChild(newRow);
                currRowIndex++;
            }
            var calculationProperties = ssDoc.WorkbookPart.Workbook.CalculationProperties;

            calculationProperties.ForceFullCalculation = true;
            calculationProperties.FullCalculationOnLoad = true;
            calculationProperties.CalculationOnSave = true;
            var chart = ssDoc.WorkbookPart.ChartsheetParts;
            foreach (var c in chart)
            {
                c.Chartsheet.Reload();
                c.Chartsheet.Save();
            }
           // WorkbookPart workbookPart = ssDoc.WorkbookPart;
            //WorksheetPart worksheetPart = workbookPart.WorksheetParts.First();

            string sheetName1 = workbookPart.Workbook.Descendants<Sheet>().ElementAt(1).Name;
            string relId = workbookPart.Workbook.Descendants<Sheet>().First(s => sheetName1.Equals(s.Name)).Id;
            workbookPart.Workbook.WorkbookProperties.RefreshAllConnections = true;
            WorksheetPart worksheetPart1 = (WorksheetPart)workbookPart.GetPartById(relId);
            worksheetPart1.Worksheet.Reload();
            //Thread.Sleep(5000);
            worksheetPart1.Worksheet.Reload();
        }

        private static Worksheet GetWorksheet(SpreadsheetDocument document, string worksheetName)
        {
            IEnumerable<Sheet> sheets = document.WorkbookPart.Workbook
                .Descendants<Sheet>().Where(s => s.Name == worksheetName);
            WorksheetPart worksheetPart = (WorksheetPart)document.WorkbookPart
                .GetPartById(sheets.First().Id);
            return worksheetPart.Worksheet;
        }

        private static CellType DetermineCellType(object dataItem)
        {
            CellType ct = CellType.Text;
            if (dataItem is DateTime)
            {
                ct = CellType.DateTime;
            }
            else if (Utility.IsNumeric(dataItem))
            {
                ct = CellType.Number;
            }
            //else if (dataItem is DBNull)
            //{
            //    ct = CellType.Text;
            //}
            else
            {
                ct = CellType.Text;
            }

            return ct;
        }

        private static Cell CreateTextCell(string data, string cellReference)
        {
            double result;
            DateTime resultDt;
            if (double.TryParse(data, out result))
            {
                return CreateNumberCell(data, cellReference);
            }
            else if (DateTime.TryParse(data, out resultDt))
            {
                return CreateDateCell(data, cellReference);
            }
            else
            {
                return CreateInlineTextCell(data, cellReference);
            }
        }

        static private Cell CreateDateCell(string data, string cellReference)
        {
            Cell c = new Cell();
            c.CellReference = cellReference;

            CellValue v = new CellValue();
            v.Text = data;

            c.AppendChild(v);
            return c;
        }

        //Sort of working... incomplete and in progress
        private static Cell CreateCellBasedOnType(object dataItem,
            string cellReference, int styleIndex, SpreadsheetDocument ssDoc)
        {
            Cell newCell = null;
            //WorkbookPart workbookPart = ssDoc.WorkbookPart;
            //var styles = workbookPart.GetPartsOfType<WorkbookStylesPart>().FirstOrDefault();
            //CellFormat cellFormat = (CellFormat)(styles.Stylesheet.CellFormats.Elements().ElementAt(styleIndex));

            if (dataItem is DateTime)
            {
                string universalDate = ((DateTime)dataItem).ToOADate().ToString();
                //styleIndex = (int)cellFormat.NumberFormatId.Value;
                newCell = ExcelReportGenerator.CreateDateCell(
                    universalDate, cellReference, styleIndex);
            }
            else if (Utility.IsNumeric(dataItem))
            {
                newCell = ExcelReportGenerator.CreateNumberCell(dataItem.ToString(), cellReference);
            }
            else
            {
                //newCell = ExcelReportGenerator.CreateSharedStringCell(dataItem.ToString(), cellReference);
                newCell = ExcelReportGenerator.CreateInlineTextCell(dataItem.ToString(), cellReference);
            }

            return newCell;
        }

        private static Stylesheet GenerateStyleSheet()
        {
            return new Stylesheet(
                new Fonts(
                    new Font(                                                               // Index 0 - The default font.
                        new FontSize() { Val = 11 },
                        new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                        new FontName() { Val = "Calibri" }),
                    new Font(                                                               // Index 1 - The bold font.
                        new Bold(),
                        new FontSize() { Val = 11 },
                        new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                        new FontName() { Val = "Calibri" }),
                    new Font(                                                               // Index 2 - The Italic font.
                        new Italic(),
                        new FontSize() { Val = 11 },
                        new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                        new FontName() { Val = "Calibri" }),
                    new Font(                                                               // Index 2 - The Times Roman font. with 16 size
                        new FontSize() { Val = 16 },
                        new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                        new FontName() { Val = "Times New Roman" })
                ),
                new Fills(
                    new Fill(                                                           // Index 0 - The default fill.
                        new PatternFill() { PatternType = PatternValues.None }),
                    new Fill(                                                           // Index 1 - The default fill of gray 125 (required)
                        new PatternFill() { PatternType = PatternValues.Gray125 }),
                    new Fill(                                                           // Index 2 - The yellow fill.
                        new PatternFill(
                            new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "FFFFFF00" } }
                        ) { PatternType = PatternValues.Solid })
                ),
                new Borders(
                    new Border(                                                         // Index 0 - The default border.
                        new LeftBorder(),
                        new RightBorder(),
                        new TopBorder(),
                        new BottomBorder(),
                        new DiagonalBorder()),
                    new Border(                                                         // Index 1 - Applies a Left, Right, Top, Bottom border to a cell
                        new LeftBorder(
                            new Color() { Auto = true }
                        ) { Style = BorderStyleValues.Thin },
                        new RightBorder(
                            new Color() { Auto = true }
                        ) { Style = BorderStyleValues.Thin },
                        new TopBorder(
                            new Color() { Auto = true }
                        ) { Style = BorderStyleValues.Thin },
                        new BottomBorder(
                            new Color() { Auto = true }
                        ) { Style = BorderStyleValues.Thin },
                        new DiagonalBorder())
                ),
                new CellFormats(
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 0 },                          // Index 0 - The default cell style.  If a cell does not have a style index applied it will use this style combination instead
                    new CellFormat() { FontId = 1, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 1 - Bold
                    new CellFormat() { FontId = 2, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 2 - Italic
                    new CellFormat() { FontId = 3, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 3 - Times Roman
                    new CellFormat() { FontId = 0, FillId = 2, BorderId = 0, ApplyFill = true },       // Index 4 - Yellow Fill
                    new CellFormat(                                                                   // Index 5 - Alignment
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center, Vertical = VerticalAlignmentValues.Center }
                    ) { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 1, ApplyBorder = true },     // Index 6 - Border
                    new CellFormat(                                                                   // Index 7 - Alignment & Bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center, Vertical = VerticalAlignmentValues.Center }
                    ) { FontId = 1, FillId = 0, BorderId = 0, ApplyFont = true, ApplyAlignment = true }
                )
            ); // return
        }

        #region Cell creation

        private static Cell CreateInlineTextCell(string data, string cellReference)
        {
            Cell newCell = new Cell();
            newCell.DataType = CellValues.InlineString;
            newCell.CellReference = cellReference;

            InlineString inlineString = new InlineString();
            Text t = new Text();
            // t.Text =  data;
            t.Text = HttpUtility.HtmlDecode(data);
            inlineString.AppendChild(t);

            newCell.AppendChild(inlineString);

            return newCell;
        }

        //private static Cell CreateSharedStringCell(string data, string cellReference)
        //{
        //    //                //int ssIndex = InsertSharedStringItem(workbookPart, data[i][j].ToString());
        //    //                //newCell.CellValue.Text = ssIndex.ToString();
        //}

        static private Cell CreateNumberCell(string data, string cellReference)
        {
            Cell c = new Cell();
            c.CellReference = cellReference;

            CellValue v = new CellValue();
            v.Text = data.ToString();

            c.AppendChild(v);
            return c;
        }

        static private Cell CreateDateCell(string data, string cellReference, int cellStyleIndex)
        {
            Cell c = new Cell();
            c.CellReference = cellReference;
            c.StyleIndex = (UInt32)cellStyleIndex;

            CellValue v = new CellValue();
            v.Text = data;

            c.AppendChild(v);
            return c;
        }

        //static private Cell CreateDateCell(string data, string cellReference, int cellStyleIndex, SpreadsheetDocument ssDoc)
        //{
        //    Random rnd = new Random();

        //    Cell c = new Cell();
        //    c.CellReference = cellReference;
        //    //c.StyleIndex = (UInt32)rnd.Next(1, 8);
        //    c.StyleIndex = (UInt32)cellStyleIndex;

        //    int ssIndex = InsertSharedStringItem(ssDoc.WorkbookPart, data);
        //    CellValue cv = new CellValue(ssIndex.ToString());
        //    //c.CellValue = cv;
        //    c.AppendChild(cv);

        //    return c;
        //}

        #endregion Cell creation
    }
}