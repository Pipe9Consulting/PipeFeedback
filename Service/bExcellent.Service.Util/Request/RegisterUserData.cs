using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class RegisterUserData
    {
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }

        public string CompanyName { get; set; }

        public string CompanySize { get; set; }

        public string type { get; set; }

        public int CountryId { get; set; }
    }
}