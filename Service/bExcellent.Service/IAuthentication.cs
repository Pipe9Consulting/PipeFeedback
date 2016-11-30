using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IAuthentication" in both code and config file together.

    /// <summary>
    /// 
    /// </summary>
    public interface IAuthentication
    {
        AuthenticationResult AuthenticateUser(string userName, string passwordText);
    }


}