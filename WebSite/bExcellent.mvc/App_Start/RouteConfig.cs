using System.Web.Mvc;
using System.Web.Routing;
using TG.Site;

namespace bExcellent.mvc
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            //routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("elmah.axd");
            routes.IgnoreRoute("network.html");
            routes.IgnoreRoute("elmah.axd/{*pathInfo}");

            routes.Add("BlogRouteProfile", new DomainRoute("https://www.cloudascoach.com", "", new { controller = "Home", action = "Login", url = "" }));

            routes.Add("BlogPost3", new DomainRoute("https://www.cloudascoach.com", "Home/login", new { controller = "Home", action = "Login", url = "" }));

            routes.MapRoute(
                name: "SignUp",
                url: "SignUp/{task}/{resource}",
                defaults: new { controller = "SignUp", action = "AddMember" }
            );

            routes.MapRoute(
                 "CloudSolutions",
                 "CloudSolutions",
                 new { controller = "KessakuHome", action = "CloudSolutions" }
            );
            routes.MapRoute(
                 "CloudAsCoach",
                 "CloudAsCoach",
                 new { controller = "KessakuHome", action = "CloudAsCoach" }
            );
            routes.MapRoute(
                             "Resources",
                             "Resources",
                             new { controller = "KessakuHome", action = "Resources" }
                        );
            routes.MapRoute(
                             "Pricing",
                             "Pricing",
                             new { controller = "KessakuHome", action = "Pricing" }
                        );
            routes.MapRoute(
                             "RequestDemo",
                             "RequestDemo",
                             new { controller = "KessakuHome", action = "RequestADemo" }
                        );
            routes.MapRoute(
                            "Videos",
                            "Videos",
                            new { controller = "KessakuHome", action = "Videos" }
                       );
            routes.MapRoute(
                           "Events",
                           "Events",
                           new { controller = "KessakuHome", action = "Events" }
                      );
            routes.MapRoute(
                           "Home",
                           "Home",
                           new { controller = "KessakuHome", action = "Home" }
                      );
            routes.MapRoute(
                          "DownloadableContent",
                          "DownloadableContent",
                          new { controller = "KessakuHome", action = "DownloadableContent" }
                     );
            routes.MapRoute(
                         "#CloudAsCoach",
                         "#CloudAsCoach",
                         new { controller = "KessakuHome", action = "PartialPage" }
                    );
            routes.MapRoute(
                           "IsYourTeam",
                           "IsYourTeam",
                           new { controller = "KessakuHome", action = "IsYourTeam" }
                      );
            routes.MapRoute(
                           "communitysync/communitysync",
                           "communitysync/communitysync",
                           new { controller = "Standing", action = "Standing" }
                      );
            routes.MapRoute(
                           "communitysync/BigPicture",
                           "communitysync/BigPicture",
                           new { controller = "Standing", action = "BigPicture" }
                      );
            routes.MapRoute(
                           "communitysync/PracticeAreas",
                           "communitysync/PracticeAreas",
                           new { controller = "Standing", action = "PracticeAreas" }
                      );
            routes.MapRoute(
                           "communitysync/ExcellenceIndicators",
                           "communitysync/ExcellenceIndicators",
                           new { controller = "Standing", action = "ExcellenceIndicators" }
                      );
            routes.MapRoute(
                           "managersync/managersync",
                           "managersync/managersync",
                           new { controller = "Sync", action = "Sync" }
                      );
            routes.MapRoute(
                           "managersync/BigPicture",
                           "managersync/BigPicture",
                           new { controller = "Sync", action = "BigPicture" }
                      );
            routes.MapRoute(
                           "managersync/PracticeAreas",
                           "managersync/PracticeAreas",
                           new { controller = "Sync", action = "PracticeAreas" }
                      );
            routes.MapRoute(
                           "managersync/ExcellenceIndicators",
                           "managersync/ExcellenceIndicators",
                           new { controller = "Sync", action = "ExcellenceIndicators" }
                      );
            routes.MapRoute(
                          "FeedbackResults/FeedbackResults",
                          "FeedbackResults/FeedbackResults",
                          new { controller = "Result", action = "Result" }
                     );
            routes.MapRoute(
                          "FeedbackResults/BigPicture",
                          "FeedbackResults/BigPicture",
                          new { controller = "Result", action = "BigPicture" }
                     );
            routes.MapRoute(
                          "FeedbackResults/PracticeAreas",
                          "FeedbackResults/PracticeAreas",
                          new { controller = "Result", action = "PracticeAreas" }
                     );
            routes.MapRoute(
                          "FeedbackResults/ExcellenceActions",
                          "FeedbackResults/ExcellenceActions",
                          new { controller = "Result", action = "ExcellenceActions" }
                     );
            //routes.MapRoute(
            //             "Homes",
            //             "Homes",
            //             new { controller = "KessakuHome", action = "PartialPage" }
            //        );
            
     
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Microsoft", action = "Login", id = UrlParameter.Optional }
            );
        }
    }
}