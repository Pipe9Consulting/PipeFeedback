using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Response
{
    public class CompleteStatus
    {
        public int AssesmentCompletedAM { get; set; }
        public int AssesmentCompletedRM { get; set; }
        public int AssesmentCompletedVM { get; set; }

        public int AssesmentCreatedAM { get; set; }
        public int AssesmentCreatedRM { get; set; }
        public int AssesmentCreatedVM { get; set; }

        public int PartnerAM { get; set; }
        public int PartnerRM { get; set; }
        public int PartnerVM { get; set; }
    }
}
