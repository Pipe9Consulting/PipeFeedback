using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class CreateUserMappingRequest
    {
        /// <summary>
        /// Current LoggedIn User.
        /// </summary>
        /// <value>
        /// The manager id.
        /// </value>
        public int ManagerId { get; set; }

        public int UserMappingId { get; set; }

        public int POEId { get; set; }

        public int RoleId { get; set; }

        public string NetworkName { get; set; }
    }
}