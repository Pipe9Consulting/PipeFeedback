using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.DataAccess
{
    public interface IDataContextFactory
    {
        /// <summary>
        /// Returns MaxiPoe data context object
        /// </summary>
        /// <returns>IIntelliSetDataProviderDataContext object</returns>
        bExcellentDataContext GetIntelliSetDataContext();
    }
}