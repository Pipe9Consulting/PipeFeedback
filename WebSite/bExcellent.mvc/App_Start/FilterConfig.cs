using System.Web;
using System.Web.Mvc;

namespace bExcellent.mvc.App_Start
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            filters.Add(new ValidateInputAttribute(false));
        }
    }

    public class SessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;

            //redirect to login page if session is not found
            if (ctx.Session == null)
            {
                filterContext.Result = new RedirectResult("https://demo.pipe9cloud.com");
            }
            else if (ctx.Session["id"] == null)
            {
                filterContext.Result = new RedirectResult("https://demo.pipe9cloud.com");
            }
            

            // check if session is supported
            if (ctx.Session != null)
            {
                // check if a new session id was generated
                if (ctx.Session.IsNewSession)
                {
                    // If it says it is a new session, but an existing cookie exists, then it must
                    // have timed out
                    string sessionCookie = ctx.Request.Headers["Cookie"];
                    if ((null != sessionCookie) && (sessionCookie.IndexOf("ASP.NET_SessionId", System.StringComparison.Ordinal) >= 0))
                    {
                        var httpCookie = ctx.Request.Cookies["redirectionval"];
                        if (httpCookie != null)
                        {
                            var redirectto = httpCookie.Value;
                            if (redirectto == "login")
                            {
                                filterContext.Result = new RedirectResult("https://demo.pipe9cloud.com");
                            }
                            else
                            {
                               // filterContext.Result = new RedirectResult("~/");
                                filterContext.Result = new RedirectResult("https://demo.pipe9cloud.com");
                            }
                        }
                    }
                }
                else
                {
                    if (ctx.Session.Keys.Count == 0)
                    {
                        var httpCookie = ctx.Request.Cookies["redirectionval"];
                        if (httpCookie != null)
                        {
                            var redirectto = httpCookie.Value;
                            if (redirectto == "login")
                            {
                                //filterContext.Result = new RedirectResult("~/Microsoft/Login");
                                filterContext.Result = new RedirectResult("https://demo.pipe9cloud.com");
                            }
                            else
                            {
                                //filterContext.Result = new RedirectResult("~/");
                                filterContext.Result = new RedirectResult("https://demo.pipe9cloud.com");
                            }
                        }
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

    public class SessionExpireFilterHomeAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;

            // check if session is supported
            if (ctx.Session != null)
            {
                // check if a new session id was generated
                if (ctx.Session.IsNewSession)
                {
                    // If it says it is a new session, but an existing cookie exists, then it must
                    // have timed out
                    string sessionCookie = ctx.Request.Headers["Cookie"];
                    if ((null != sessionCookie) && (sessionCookie.IndexOf("ASP.NET_SessionId", System.StringComparison.Ordinal) >= 0))
                    {
                        filterContext.Result = new RedirectResult("~/KessakuHome/PartialPage");
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

    public class SessionExpireReportAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;

            // check if session is supported
            if (ctx.Session != null)
            {
                // check if a new session id was generated
                if (ctx.Session.IsNewSession)
                {
                    // If it says it is a new session, but an existing cookie exists, then it must
                    // have timed out
                    string sessionCookie = ctx.Request.Headers["Cookie"];
                    if ((null != sessionCookie) && (sessionCookie.IndexOf("ASP.NET_SessionId", System.StringComparison.Ordinal) >= 0))
                    {
                        filterContext.Result = new RedirectResult("~/KessakuHome/PartialPage");
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

    public class SessionExpireFilterHomePagesAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var path = HttpContext.Current.Request.Url.Host;
            if (path == "localhost")
            {
                filterContext.Result = new RedirectResult("https://www.cloudascoach.com/" + HttpContext.Current.Request.Url.AbsolutePath);
            }

            base.OnActionExecuting(filterContext);
        }
    }
}