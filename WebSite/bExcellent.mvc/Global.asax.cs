using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using bExcellent.mvc.App_Start;
using bExcellent.mvc.Controllers;

namespace bExcellent.mvc
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode,
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            if (HttpContext.Current.Request["RequireUploadifySessionSync"] != null)
                UploadifySessionSync();
        }

        private void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            string sessionId = Session.SessionID;
        }

        /// <summary>
        /// Uploadify uses a Flash object to upload files. This method retrieves and hydrates Auth and Session objects when the Uploadify Flash is calling.
        /// </summary>
        /// <remarks>
        ///     Kudos: http://geekswithblogs.net/apopovsky/archive/2009/05/06/working-around-flash-cookie-bug-in-asp.net-mvc.aspx
        ///     More kudos: http://stackoverflow.com/questions/1729179/uploadify-session-and-authentication-with-asp-net-mvc
        /// </remarks>
        protected void UploadifySessionSync()
        {
            try
            {
                string session_param_name = "SessionId";
                string session_cookie_name = "ASP.NET_SessionId";

                if (HttpContext.Current.Request[session_param_name] != null)
                    UploadifyUpdateCookie(session_cookie_name, HttpContext.Current.Request.Form[session_param_name]);
            }
            catch { }

            try
            {
                string auth_param_name = "SecurityToken";
                string auth_cookie_name = FormsAuthentication.FormsCookieName;

                if (HttpContext.Current.Request[auth_param_name] != null)
                    UploadifyUpdateCookie(auth_cookie_name, HttpContext.Current.Request.Form[auth_param_name]);
            }
            catch { }
        }

        private void UploadifyUpdateCookie(string cookie_name, string cookie_value)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies.Get(cookie_name);
            if (cookie == null)
                cookie = new HttpCookie(cookie_name);
            cookie.Value = cookie_value;
            HttpContext.Current.Request.Cookies.Set(cookie);
        }

        // application error handling here
        protected void Application_Error(object sender, EventArgs e)
        {
            var ex = Server.GetLastError().GetBaseException();

            // Trace.Write(Environment.NewLine + Environment.NewLine + "Date :" + DateTime.Now.ToString() + " " + ex.ToString());

            Server.ClearError();

            var routeData = new RouteData();

            routeData.Values.Add("controller", "Home");
            routeData.Values.Add("action", "ErrorMsg");
            //if (ex.GetType() == typeof(HttpException))
            //{
            //    var httpException = (HttpException)ex;
            //    var code = httpException.GetHttpCode();
            //    routeData.Values.Add("status", code);
            //}
            //else
            //    routeData.Values.Add("status", 500);
            routeData.Values.Add("error", ex.Message);
            IController errorController = new HomeController();
            errorController.Execute(new RequestContext(new HttpContextWrapper(Context), routeData));
        }
    }
}