using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class AuthenticationResult
    {
        public bool IsAuthenticated { get; set; }

        public bool IsFirstTimeLogin { get; set; }

        public bool IsPasswordExpired { get; set; }

        public string Message { get; set; }

        public string AuthenticationToken { get; set; }

        public User currentUser { get; set; }
    }
}