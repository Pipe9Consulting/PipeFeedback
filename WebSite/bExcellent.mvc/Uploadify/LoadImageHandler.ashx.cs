using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Drawing;
using bExcellent.mvc.CommonWCF;

namespace bExcellent.mvc.Uploadify
{
    /// <summary>
    /// Summary description for LoadImageHandler
    /// </summary>
    public class LoadImageHandler : IHttpHandler, System.Web.SessionState.IReadOnlySessionState 
    {

        public void ProcessRequest(HttpContext context)
        {
            byte[] image = GetImage(context.Request.QueryString["id"], context);
            context.Response.Clear();
            context.Response.ContentType = "image/pjpeg";
            if(image.Length==1||image.Length==0)
            {
                var userId = int.Parse(context.Session["id"].ToString());
                string path = HttpContext.Current.Server.MapPath("/Images/icons/you-b.png");
                if (userId == 480)
                {
                    path = HttpContext.Current.Server.MapPath("/Images/erin.jpg");
                }
                if (userId == 486)
                {
                    path = HttpContext.Current.Server.MapPath("/Images/Betty.jpg");
                }  
               // string 
                context.Response.WriteFile(path); 
            } 
            else 
                context.Response.BinaryWrite(image);
            context.Response.End();
            
        }

        public bool IsReusable
        {
            get { return true; }
        }

        private byte[] GetImage(string id, HttpContext context)
        {
            CommonClient common = new CommonClient();
            if (id!="0"&&id!="null")
            {
                byte[] image = common.GetUserPhoto(int.Parse(id)).Photo;
                return image;
                
            }
            else
            {
                return new byte[] { 0 };
                
            }

        }
     
    }
}