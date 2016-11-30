namespace bExcellent.Service.Util.Domain
{
    public class Plan
    {
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public int MaxUsercount { get; set; }
        public int MaxPoeCount { get; set; }
        public decimal PoeCost { get; set; }
        public decimal UserCost { get; set; }
    }
}
