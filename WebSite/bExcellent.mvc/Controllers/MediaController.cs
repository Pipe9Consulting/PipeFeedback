using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bExcellent.mvc.CommonWCF;
using bExcellent.mvc.Models;
using bExcellent.mvc.Uploadify;

namespace bExcellent.mvc.Controllers
{
    public class MediaController : Controller
    {
        #region static variables

        private static string ImageCacheKey = "ImageKey_";
        private static int W_FixedSize = 175;
        private static int H_FixedSize = 175;

        #endregion static variables

        #region local properties

        private string WorkingImageCacheKey
        {
            get { return string.Format("{0}{1}", ImageCacheKey, WorkingImageId); }
        }

        private string ModifiedImageCacheKey
        {
            get { return string.Format("{0}{1}", ImageCacheKey, ModifiedImageId); }
        }

        private string ResizedImageCacheKey
        {
            get { return string.Format("{0}{1}", ImageCacheKey, ResizedImageId); }
        }

        #endregion local properties

        #region session properties

        private Guid WorkingImageId
        {
            get
            {
                if (Session["WorkingImageId"] != null)
                    return (Guid)Session["WorkingImageId"];
                else
                    return new Guid();
            }
            set { Session["WorkingImageId"] = value; }
        }

        private Guid ModifiedImageId
        {
            get
            {
                if (Session["ModifiedImageId"] != null)
                    return (Guid)Session["ModifiedImageId"];
                else
                    return new Guid();
            }
            set { Session["ModifiedImageId"] = value; }
        }

        private Guid ResizedImageId
        {
            get
            {
                if (Session["ResizedImageId"] != null)
                    return (Guid)Session["ResizedImageId"];
                else
                    return new Guid();
            }
            set { Session["ResizedImageId"] = value; }
        }

        private string WorkingImageExtension
        {
            get
            {
                if (Session["WorkingImageExtension"] != null)
                    return Session["WorkingImageExtension"].ToString();
                else
                    return string.Empty;
            }
            set { Session["WorkingImageExtension"] = value; }
        }

        #endregion session properties

        #region cached properties

        private byte[] WorkingImage
        {
            get
            {
                byte[] img = null;

                if (HttpContext.Cache[WorkingImageCacheKey] != null)
                    img = (byte[])HttpContext.Cache[WorkingImageCacheKey];

                return img;
            }
            set
            {
                HttpContext.Cache.Add(WorkingImageCacheKey,
                  value,
                  null,
                  System.Web.Caching.Cache.NoAbsoluteExpiration,
                  new TimeSpan(0, 40, 0),
                  System.Web.Caching.CacheItemPriority.Low,
                  null);
            }
        }

        private byte[] ModifiedImage
        {
            get
            {
                byte[] img = null;
                if (HttpContext.Cache[ModifiedImageCacheKey] != null)
                    img = (byte[])HttpContext.Cache[ModifiedImageCacheKey];
                return img;
            }
            set
            {
                HttpContext.Cache.Add(ModifiedImageCacheKey,
                    value,
                    null,
                    System.Web.Caching.Cache.NoAbsoluteExpiration,
                    new TimeSpan(0, 40, 0),
                    System.Web.Caching.CacheItemPriority.Low,
                    null);
            }
        }

        private byte[] ResizedImage
        {
            get
            {
                byte[] img = null;
                if (HttpContext.Cache[ResizedImageCacheKey] != null)
                    img = (byte[])HttpContext.Cache[ResizedImageCacheKey];
                return img;
            }
            set
            {
                HttpContext.Cache.Add(ResizedImageCacheKey,
                    value,
                    null,
                    System.Web.Caching.Cache.NoAbsoluteExpiration,
                    new TimeSpan(0, 40, 0),
                    System.Web.Caching.CacheItemPriority.Low,
                    null);
            }
        }

        #endregion cached properties

        /// <summary>
        ///
        /// </summary>
        private enum ImageModificationType
        {
            Crop,
            Resize
        };

        /// <summary>
        /// File upload control for uploading image.
        /// </summary>
        /// <param name="uploadedFileMeta">The uploaded file meta.</param>
        /// <returns></returns>
        //[Authorize]
        [AllowAnonymous]
        public ActionResult FileUpload(MediaAssetUploadModel uploadedFileMeta)
        {
            var newImageId = new Guid();
            try
            {
                if (!GetImageMimeType(uploadedFileMeta.fileData.InputStream).Contains("unknown"))
                {
                    newImageId = ProcessUploadedImage(uploadedFileMeta);

                    Session["statusval"] = "OK";
                }
                else
                {
                    throw new Exception("Invalid image format");
                }
                //  newImageId = ProcessUploadedImage(uploadedFileMeta);

                //Session["statusval"] = "OK";
            }
            catch (Exception ex)
            {
                string errorMsg = string.Format("Error processing image: {0}", ex.Message);
                Response.StatusCode = 500;
                Response.Write(errorMsg);
                return Json(string.Empty);
            }

            return Json(new { Id = newImageId, Status = "OK" });
        }

        /// <summary>
        /// Processes the uploaded image.
        /// </summary>
        /// <param name="uploadedFileMeta">The uploaded file meta.</param>
        /// <returns></returns>
        private Guid ProcessUploadedImage(MediaAssetUploadModel uploadedFileMeta)
        {
            // Get the file extension
            WorkingImageExtension = Path.GetExtension(uploadedFileMeta.Filename).ToLower();
            string[] allowedExtensions = { ".png", ".jpeg", ".jpg", ".gif" }; // Make sure it is an image that can be processed
            if (allowedExtensions.Contains(WorkingImageExtension))
            {
                WorkingImageId = Guid.NewGuid();
                Image workingImage = new Bitmap(uploadedFileMeta.fileData.InputStream);
                WorkingImage = ImageHelper.ImageToByteArray(workingImage);
            }
            else
            {
                throw new Exception("Cannot process files of this type.");
            }

            return WorkingImageId;
        }

        /// <summary>
        /// Crops the uploaded image.
        /// </summary>
        /// <param name="x">The x.</param>
        /// <param name="y">The y.</param>
        /// <param name="w">The w.</param>
        /// <param name="h">The h.</param>
        /// <returns></returns>
        public JsonResult CropImage(int x, int y, int w, int h, int module, int rWidth, int rHeight)
        {
            try
            {
                if (w == 0 && h == 0) // Make sure the user selected a crop area
                    throw new Exception("A crop selection was not made.");
                ResizeImage(rWidth, rHeight);
                string imageId = ModifyImage(x, y, w, h, ImageModificationType.Crop, module);
                return Json(imageId);
            }
            catch (Exception ex)
            {
                string errorMsg = string.Format("Error cropping image: {0}", ex.Message);
                Response.StatusCode = 500;
                Response.Write(errorMsg);
                return Json(string.Empty);
            }
        }

        /// <summary>
        /// Modifies the image.
        /// </summary>
        /// <param name="x">The x.</param>
        /// <param name="y">The y.</param>
        /// <param name="w">The w.</param>
        /// <param name="h">The h.</param>
        /// <param name="modType">Type of the mod.</param>
        /// <returns></returns>
        private string ModifyImage(int x, int y, int w, int h, ImageModificationType modType, int module)
        {
            //ResizeImage();
            ModifiedImageId = Guid.NewGuid();
            Image img = ImageHelper.ByteArrayToImage(ResizedImage);

            using (var bitmap = new Bitmap(w, h))
            {
                bitmap.SetResolution(img.HorizontalResolution, img.VerticalResolution);
                using (Graphics graphic = Graphics.FromImage(bitmap))
                {
                    graphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    graphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    graphic.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    graphic.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

                    if (modType == ImageModificationType.Crop)
                    {
                        graphic.DrawImage(img, 0, 0, w, h);
                        graphic.DrawImage(img, new Rectangle(0, 0, w, h), x, y, w, h, GraphicsUnit.Pixel);
                    }
                    else if (modType == ImageModificationType.Resize)
                    {
                        graphic.DrawImage(img, 0, 0, img.Width, img.Height);
                        graphic.DrawImage(img, new Rectangle(0, 0, W_FixedSize, H_FixedSize), 0, 0, img.Width, img.Height, GraphicsUnit.Pixel);
                    }

                    string extension = WorkingImageExtension;

                    // If the image is a gif file, change it into png
                    if (extension.EndsWith("gif", StringComparison.OrdinalIgnoreCase))
                    {
                        extension = ".png";
                    }

                    using (var encoderParameters = new EncoderParameters(1))
                    {
                        encoderParameters.Param[0] = new EncoderParameter(Encoder.Quality, 100L);
                        ModifiedImage = ImageHelper.ImageToByteArray(bitmap, extension, encoderParameters);
                        try
                        {
                            if (module == 2)
                            {
                                //  var returnValue = common.UpdateUserPhoto(int.Parse(Session["id"].ToString()), ModifiedImage);
                            }
                        }
                        catch (Exception)
                        {
                            throw new Exception("Image size is too large.");
                        }
                    }
                }
            }

            return ModifiedImageId.ToString();
        }

        private string ResizeImage(int rWidth, int rHeight)
        {
            ResizedImageId = Guid.NewGuid();
            Image img = ImageHelper.ByteArrayToImage(WorkingImage);

            W_FixedSize = rWidth;

            H_FixedSize = rHeight;

            using (var bitmap = new Bitmap(W_FixedSize, H_FixedSize))
            {
                bitmap.SetResolution(img.HorizontalResolution, img.VerticalResolution);
                using (Graphics graphic = Graphics.FromImage(bitmap))
                {
                    graphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    graphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    graphic.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    graphic.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

                    graphic.DrawImage(img, 0, 0, img.Width, img.Height);
                    graphic.DrawImage(img, new Rectangle(0, 0, W_FixedSize, H_FixedSize), 0, 0, img.Width, img.Height, GraphicsUnit.Pixel);

                    string extension = WorkingImageExtension;

                    // If the image is a gif file, change it into png
                    if (extension.EndsWith("gif", StringComparison.OrdinalIgnoreCase))
                    {
                        extension = ".png";
                    }

                    using (var encoderParameters = new EncoderParameters(1))
                    {
                        encoderParameters.Param[0] = new EncoderParameter(Encoder.Quality, 100L);
                        ResizedImage = ImageHelper.ImageToByteArray(bitmap, extension, encoderParameters);
                    }
                }
            }

            return ResizedImageId.ToString();
        }

        private static string GetImageMimeType(Stream imageData)
        {
            String mimeType = "image/unknown";

            try
            {
                Guid id;

                using (var img = Image.FromStream(imageData))
                {
                    id = img.RawFormat.Guid;
                }

                if (id == ImageFormat.Png.Guid)
                {
                    mimeType = "image/png";
                }
                else if (id == ImageFormat.Bmp.Guid)
                {
                    mimeType = "image/bmp";
                }
                else if (id == ImageFormat.Emf.Guid)
                {
                    mimeType = "image/x-emf";
                }
                else if (id == ImageFormat.Exif.Guid)
                {
                    mimeType = "image/jpeg";
                }
                else if (id == ImageFormat.Gif.Guid)
                {
                    mimeType = "image/gif";
                }
                else if (id == ImageFormat.Icon.Guid)
                {
                    mimeType = "image/ico";
                }
                else if (id == ImageFormat.Jpeg.Guid)
                {
                    mimeType = "image/jpeg";
                }
                else if (id == ImageFormat.MemoryBmp.Guid)
                {
                    mimeType = "image/bmp";
                }
                else if (id == ImageFormat.Tiff.Guid)
                {
                    mimeType = "image/tiff";
                }
                else if (id == ImageFormat.Wmf.Guid)
                {
                    mimeType = "image/wmf";
                }
            }
            catch (Exception e)
            {
                return "image/unknown";
            }

            return mimeType;
        }
    }
}