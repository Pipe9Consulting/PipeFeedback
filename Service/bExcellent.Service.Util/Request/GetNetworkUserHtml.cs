using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Request
{
    public class GetNetworkUserHtmlRequest
    {
        public int UserId { get; set; }

        public string FilterType { get; set; }

        private int POEID;
        /*  public int POEId
          {
              get
              {
                  return _POEID;
              }
              set
              {
                  _POEID = value;
                  SessionHandler.UserSelectedPOE = value;
              }
          }*/
    }
}