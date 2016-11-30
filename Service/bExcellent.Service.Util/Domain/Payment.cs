namespace bExcellent.Service.Util.Domain
{
    
    public class Payment
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string CreditCard { get; set; }
        public string CVV { get; set; }
        public decimal Amount{ get; set; }
       // public string SubscriptionId { get; set; }
        public string Response { get; set; }
        public string ResponseId { get; set; }
    }
}
