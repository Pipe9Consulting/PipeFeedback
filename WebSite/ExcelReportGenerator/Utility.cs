using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ExcelGenerator
{
    class Utility
    {
        public static MemoryStream LoadFile(string filename)
        {
            byte[] fileBytes;

            using (FileStream fs = new FileStream(filename, FileMode.Open, System.Security.AccessControl.FileSystemRights.ReadData,
                FileShare.Read, 1024 * 8, FileOptions.None))
            {
                int bytesRead = 0;
                fileBytes = new byte[fs.Length];
                while (bytesRead < fs.Length)
                {
                    bytesRead += fs.Read(fileBytes, 0, (int)fs.Length);
                }
            }

            MemoryStream ms = new MemoryStream();
            ms.Write(fileBytes, 0, fileBytes.Length);

            fileBytes = null;

            return ms;
        }

        public static bool IsNumeric(object dataItem)
        {
            bool parseSuccess = false;
            double parsedNumber;
            if (Double.TryParse(dataItem.ToString(), out parsedNumber))
            {
                parseSuccess = true;
            }

            return parseSuccess;
        }
    }
}
