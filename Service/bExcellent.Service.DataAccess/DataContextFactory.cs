using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace bExcellent.Service.DataAccess
{
    public sealed class DataContextFactory : IDataContextFactory
    {
        public bExcellentDataContext GetIntelliSetDataContext()
        {
            return new bExcellentDataContext(ConfigurationManager.ConnectionStrings["bExcellentConnectionString"].ToString());
        }
    }
}