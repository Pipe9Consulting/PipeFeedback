using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using bExcellent.Service.Util.Request;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ISignup" in both code and config file together.
  
    public interface ISignup
    {
        bool SignUp(SignupRequest sr); 
    }
}
