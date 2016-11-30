using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Request;

namespace bExcellent.Service.Util.Response
{
    public class Partner
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string MPLID { get; set; }
        public string PartnerName { get; set; }
        public string DET { get; set; }
        public string OriginalPartnerName { get; set; }
        public int FBStatus { get; set; }
        public string FileName { get; set; }
        public int PlanId { get; set; }
        public string Extension { get; set; }
        public string RealFileName { get; set; }
        public string CountryName { get; set; }
        public List<PPAResults> PartnerResults { get; set; }
        
    }
}
