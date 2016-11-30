using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class PoeModules
    {
        public List<PoeModuleValues> Modules { get; set; }
    }

    public class PoeModuleValues
    {
        public int ModuleId { get; set; }

        public string PoeName { get; set; }

        public string Modulename { get; set; }

        public double ModuleAverage { get; set; }

        public string Priority { get; set; }

        public WeightageValue WeightageScores { get; set; }
    }

    public class WeightageValue
    {
        public double Rarely { get; set; }

        public double Inconsistenly { get; set; }

        public double Frequently { get; set; }

        public double Always { get; set; }
    }
}