using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.SignUpWCF;
using bExcellent.mvc.Uploadify;

using System.Net;
using System.Web.Hosting;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using UserPOEMapping = bExcellent.mvc.SignUpWCF.UserPOEMapping;
using System.IO;

namespace bExcellent.mvc.Controllers
{
    public class NetworkController : Controller
    {
        private SignupRequest sr = new SignupRequest();

        [SessionExpireFilter]
        public ActionResult Network(int? pageMode)
        {
            //  Session["id"] = 3;
            Session["subid"] = -1;

            if (pageMode != null)
            {
                Session["NetworkPage"] = pageMode;
            }
            else
            {
                Session["NetworkPage"] = null;
            }

            return View();
        }

        /// <summary>
        /// Jsons the response.
        /// </summary>
        /// <param name="s">The s.</param>
        /// <returns></returns>
        private JsonResult JsonResponse(object s)
        {
            if (Request.RequestType == "GET")
                return Json(s, JsonRequestBehavior.AllowGet);
            else
                return Json(s);
        }

        public JsonResult LoadUserPlan()
        {
            Session["Mode"] = 0;
            SignupClient getalluser = new SignupClient();
            var networkdata = getalluser.GetMyAllUsers(int.Parse(Session["id"].ToString()),

                                  int.Parse(Session["subid"].ToString()));

            CommonClient common = new CommonClient();
            var returnValue = common.GetMySubscription(Session["emailid"].ToString()).FirstOrDefault();
            var planid = 0;
            if (Session["paidOrTrial"] == null)
            {
                planid = returnValue.Plan;
                if (returnValue.Plan == 2)
                {
                    Session["paidOrTrial"] = "paid";
                }
                else
                {
                    Session["paidOrTrial"] = "trial";
                    if (Session["YammerMembers"] == null)
                    {
                        Session["YammerMembers"] = networkdata;
                    }
                }
            }
            else
            {
                if (Session["paidOrTrial"] == "paid")
                {
                    planid = 2;
                }
                else
                {
                    if (Session["YammerMembers"] == null)
                    {
                        Session["YammerMembers"] = networkdata;
                    }
                    planid = 1;
                }
            }
            var yammerUsrCount = 0;
            var usercounts = 0;

            if (Session["YammerMembers"] != null)
            {
                UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["YammerMembers"];
                for (var i = 0; i < sesiondata.Count(); i++)
                {
                    for (var j = 0; j < networkdata.Count(); j++)
                    {
                        if (networkdata[j].User.EmailAddress == sesiondata[i].User.EmailAddress)
                        {
                            usercounts = usercounts + 1;
                            break;
                        }
                    }
                }
                var subUser = (SignUpWCF.User)Session["user"];
                for (var i = 0; i < sesiondata.Count(); i++)
                {
                    if (sesiondata[i].User.EmailAddress == subUser.EmailAddress)
                    {
                        usercounts = usercounts + 1;
                        break;
                    }
                }
                yammerUsrCount = sesiondata.Count();
            }

            var yammerDetail = new NetworkYammerDetail();

            yammerDetail.Usercount = networkdata.Count();
            yammerDetail.Planid = planid;
            yammerDetail.yammerUserCount = yammerUsrCount - usercounts;
            //Session["CartList"] = (networkdata.Count() + yammerUsrCount) - usercounts;
            return JsonResponse(yammerDetail);
        }

        /// <summary>
        /// Gets the user profile image.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns></returns>
        private byte[] GetImage(string id)
        {
            // Create a new, empty image to return as default
            byte[] image = new byte[0];

            string imageKey = string.Format("{0}{1}", "ImageKey_", id);
            if (HttpContext.Cache[imageKey] != null)
            {
                object imgObj = HttpContext.Cache[imageKey];
                if (imgObj.GetType() == typeof(byte[]))
                    image = (byte[])imgObj;
                else if (imgObj.GetType() == typeof(Bitmap))
                {
                    using (Image tempImage = (Image)imgObj)
                    {
                        image = ImageHelper.ImageToByteArray(tempImage, string.Empty, null);
                    }
                }
            }

            return image;
        }

        public void SavePhoto(string imgId)
        {
            SignupClient common = new SignupClient();

            byte[] img = null;
            if (!string.IsNullOrEmpty(imgId))
            {
                var imgHandler = new ImageHandler();
                img = imgHandler.GetImage(imgId, System.Web.HttpContext.Current);
                SignUpWCF.User user = new SignUpWCF.User();
                user.UserId = int.Parse(Session["id"].ToString());
                user.Photo = img;
                sr.User = user;
                common.UpdateUserPhoto(sr);
            }
        }

        [SessionExpireFilter]
        public JsonResult AddYammerMemberToSession(string fname, string lname, string emailId, string poe, int designationId, string designationTitle)
        {
            //Removing Previous Records
            if (Session["YammerMembers"] != null)
            {
                var removeprevRecords = (UserPOEMapping[])Session["YammerMembers"];
                var removeUserid = (from v in removeprevRecords where v.User.EmailAddress != emailId select v).ToArray();
                Session["YammerMembers"] = removeUserid;
            }
            //Add the Current Records
            var poelist = poe.Split('%');
            var sesiondata = (UserPOEMapping[])Session["YammerMembers"];
            foreach (var s in poelist)
            {
                UserPOEMapping newuser = new UserPOEMapping();
                newuser.User = new SignUpWCF.User() { FirstName = fname, LastName = lname, EmailAddress = emailId, YammerToken = "0" };
                newuser.POE = new SignUpWCF.POE() { POEId = Convert.ToInt32(s) };
                newuser.Designation = new SignUpWCF.Designation() { Level = designationId, Name = designationTitle };
                if (sesiondata != null)
                {
                    Array.Resize(ref sesiondata, sesiondata.Length + 1);
                    sesiondata[sesiondata.Length - 1] = newuser;
                }
                else
                {
                    Array.Resize(ref sesiondata, 1);
                    sesiondata[0] = newuser;
                }

                Session["YammerMembers"] = sesiondata;
            }
            var groups = sesiondata.GroupBy(sdata => sdata.Designation.Level).ToList();
            return JsonResponse(groups);
        }

        [SessionExpireFilter]
        public JsonResult CancelYammerUser(string emailId)
        {
            UserPOEMapping[] sesiondata = (UserPOEMapping[])Session["YammerMembers"];
            if (sesiondata != null)
            {
                sesiondata = (from v in sesiondata where v.User.EmailAddress != emailId select v).ToArray();
            }

            Session["YammerMembers"] = sesiondata;
            return JsonResponse(sesiondata);
        }

        [SessionExpireFilter]
        public JsonResult GetOwnNetwork()
        {
            var common = new CommonClient();
            var commonSignup = new SignupClient();
            if (Session["emailid"] != null)
            {
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());
                if (ownsub != null)
                {
                    Session["subid"] = ownsub.Subscriptionid;
                    var network = commonSignup.GetNetworkById(ownsub.Subscriptionid);
                    Session["network"] = network;
                }
                return JsonResponse(ownsub);
            }
            else
            {
                return null;
            }
        }

        [SessionExpireFilter]
        public JsonResult OwnNetworkUser()
        {
            var common = new CommonClient();
            var commonSignup = new SignupClient();
            if (Session["emailid"] != null)
            {
                var ownsub = common.GetOwnNetwork(Session["emailid"].ToString());

                return JsonResponse(ownsub);
            }
            else
            {
                return null;
            }
        }



        public ActionResult CropImage(
           string imagePath,
           int? cropPointX,
           int? cropPointY,
           int? imageCropWidth,
           int? imageCropHeight)
        {
            if (string.IsNullOrEmpty(imagePath)
                || !cropPointX.HasValue
                || !cropPointY.HasValue
                || !imageCropWidth.HasValue
                || !imageCropHeight.HasValue)
            {
                return new HttpStatusCodeResult((int)HttpStatusCode.BadRequest);
            }

            byte[] imageBytes = System.IO.File.ReadAllBytes(Server.MapPath(imagePath));
            byte[] croppedImage = CropImage(imageBytes, cropPointX.Value, cropPointY.Value, imageCropWidth.Value, imageCropHeight.Value);

            string tempFolderName = Server.MapPath("~/" + "Temp");

            string fileNameWithoutExtension = System.IO.Path.GetFileNameWithoutExtension(imagePath);
            string fileName = System.IO.Path.GetFileName(imagePath).Replace(fileNameWithoutExtension, fileNameWithoutExtension + "_cropped");

            try
            {
                SaveFile(croppedImage, System.IO.Path.Combine(tempFolderName, fileName));
            }
            catch (Exception)
            {
                //Log an error     
                return new HttpStatusCodeResult((int)HttpStatusCode.InternalServerError);
            }

            string photoPath = string.Concat("/", "Temp", "/", fileName);
            return Json(new { photoPath = photoPath }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UploadFile()
        {
            HttpPostedFileBase myFile = Request.Files["MyFile"];
            bool isUploaded = false;

            //string tempFolderName = ConfigurationManager.AppSettings["Image.TempFolderName"];
            string tempFolderName = "Temp";
            if (myFile != null && myFile.ContentLength != 0)
            {
                string tempFolderPath = Server.MapPath("~/" + tempFolderName);

                if (CreateFolderIfNeeded(tempFolderPath))
                {
                    try
                    {
                        myFile.SaveAs(System.IO.Path.Combine(tempFolderPath, myFile.FileName));
                        isUploaded = true;
                    }
                    catch (Exception) {  /*TODO: You must process this exception.*/}
                }
            }

            string filePath = string.Concat("/", tempFolderName, "/", myFile.FileName);
            return Json(new { isUploaded, filePath }, "text/html");
        }

        //public JsonResult UpdateUserPhoto(string croppedImagePath)
        //{
        //    AuthenticationClient authentication = new AuthenticationClient();
        //    string imagePath = Server.MapPath("~/" + croppedImagePath);
        //    byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);
        //    authentication.UpdateUserPhoto(int.Parse(Session["UserId"].ToString()), imageBytes);
        //    return JsonResponse(true);
        //}

        public static void SaveFile(byte[] content, string path)
        {
            string filePath = GetFileFullPath(path);
            if (!Directory.Exists(System.IO.Path.GetDirectoryName(filePath)))
            {
                Directory.CreateDirectory(System.IO.Path.GetDirectoryName(filePath));
            }

            //Save file
            using (FileStream str = System.IO.File.Create(filePath))
            {
                str.Write(content, 0, content.Length);
            }
        }

        public static string GetFileFullPath(string path)
        {
            string relName = path.StartsWith("~") ? path : path.StartsWith("/") ? string.Concat("~", path) : path;

            string filePath = relName.StartsWith("~") ? HostingEnvironment.MapPath(relName) : relName;

            return filePath;
        }

        public static bool CreateFolderIfNeeded(string path)
        {
            bool result = true;
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception)
                {
                    /*TODO: You must process this exception.*/
                    result = false;
                }
            }
            return result;
        }



        public static byte[] CropImage(byte[] content, int x, int y, int width, int height)
        {
            using (MemoryStream stream = new MemoryStream(content))
            {
                return CropImage(stream, x, y, width, height);
            }
        }

        public static byte[] CropImage(Stream content, int x, int y, int width, int height)
        {
            //Parsing stream to bitmap
            using (Bitmap sourceBitmap = new Bitmap(content))
            {
                //Get new dimensions
                double sourceWidth = Convert.ToDouble(sourceBitmap.Size.Width);
                double sourceHeight = Convert.ToDouble(sourceBitmap.Size.Height);
                System.Drawing.Rectangle cropRect = new System.Drawing.Rectangle(x, y, width, height);

                //Creating new bitmap with valid dimensions
                using (Bitmap newBitMap = new Bitmap(cropRect.Width, cropRect.Height))
                {
                    using (Graphics g = Graphics.FromImage(newBitMap))
                    {
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.SmoothingMode = SmoothingMode.HighQuality;
                        g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                        g.CompositingQuality = CompositingQuality.HighQuality;

                        g.DrawImage(sourceBitmap, new System.Drawing.Rectangle(0, 0, newBitMap.Width, newBitMap.Height), cropRect, GraphicsUnit.Pixel);

                        return GetBitmapBytes(newBitMap);
                    }
                }
            }
        }

        public static byte[] GetBitmapBytes(Bitmap source)
        {
            //Settings to increase quality of the image
            ImageCodecInfo codec = ImageCodecInfo.GetImageEncoders()[4];
            EncoderParameters parameters = new EncoderParameters(1);
            parameters.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100L);

            //Temporary stream to save the bitmap
            using (MemoryStream tmpStream = new MemoryStream())
            {
                source.Save(tmpStream, codec, parameters);

                //Get image bytes from temporary stream
                byte[] result = new byte[tmpStream.Length];
                tmpStream.Seek(0, SeekOrigin.Begin);
                tmpStream.Read(result, 0, (int)tmpStream.Length);

                return result;
            }
        }
    }

    public class NetworkYammerDetail
    {
        public int Usercount { get; set; }

        public int Planid { get; set; }

        public int yammerUserCount { get; set; }
    }

}