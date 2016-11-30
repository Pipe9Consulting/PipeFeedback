using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class AuthenticationRequest
    {
        public string Password { get; set; }

        public string UserName { get; set; }
    }
}