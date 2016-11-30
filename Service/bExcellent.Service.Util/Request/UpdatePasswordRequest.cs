using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class UpdatePasswordRequest
    {
        public string UserName { get; set; }

        public string NewPassword { get; set; }
    }
}