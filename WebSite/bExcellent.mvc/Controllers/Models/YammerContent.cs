using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bExcellent.mvc.Models
{
    public class YammerContent
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AccesToken { get; set; }

        public string EmailId { get; set; }
    }

    public class YammerGroup
    {
        public int Groupid { get; set; }

        public string GroupName { get; set; }

        public string GroupImage { get; set; }
    }

    public class YammerGroupList
    {
        public string FirstName { get; set; }

        public string LastNAme { get; set; }

        public string EmailAddress { get; set; }

        public string ImageUrl { get; set; }
    }

    public class YammerObject
    {
        public string url { get; set; }

        public string image { get; set; }

        public string description { get; set; }

        public string title { get; set; }
    }

    public class YammerActor
    {
        public string email { get; set; }
    }

    public class YammerActivity
    {
        public YammerActor actor { get; set; }

        public string action { get; set; }

        public YammerObject Object { get; set; }

        public string message { get; set; }
    }

    public class YammerBody
    {
        public YammerBodyContent Body { get; set; }
    }

    public class YammerBodyContent
    {
        public string og_url { get; set; }

        public string og_title { get; set; }

        public string og_description { get; set; }
    }

    public class YammerOath
    {
        public YammerActivity activity { get; set; }
    }
}