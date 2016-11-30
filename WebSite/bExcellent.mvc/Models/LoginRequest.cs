using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bExcellent.mvc.Models
{
    public class LoginRequest
    {
        public bool IsGuest { get; set; }

        public int Type { get; set; }

        public int RequestFor { get; set; }

        public int RequestFrom { get; set; }

        public int FeedbackId { get; set; }

        public int PoeId { get; set; }
    }
}