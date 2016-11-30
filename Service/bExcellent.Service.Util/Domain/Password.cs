using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class Password
    {
        public User user { get; set; }

        public string UserName { get; set; }

        public string EncryptedPassword { get; set; }

        public string PasswordText { get; set; }

        public string Salt { get; set; }
    }
}