using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Attributes;

namespace bExcellent.Service.Util.Enumeration
{
    public enum AnswerType
    {
        None = 0,
        ModuleQuestion = 1,
        BarrierQuestion = 2
    }

    public enum RoleType
    {
        IC = 1,
        Manager = 2,
        DL = 3,
        Accessor = 4,
        SSP = 5,
        IC_Manager = 12
    }

    public enum FeedbackType
    {
        None = 0,
        Self = 1,
        Manager = 2
    }

    public enum FeedbackStatus
    {
        NotStarted = 0,
        InProgress = 1,
        Complete = 2
    }

    /*
    public enum POEName
    {
        [StringValue("None")]
        None = 0,

        [StringValue("CA Lead")]
        CALead = 1,

        [StringValue("CAM Sales Manager")]
        CAMSalesManager = 2,

        [StringValue("CTM Sales Manager")]
        CTMSalesManager = 3,

        [StringValue("CAM Account Manager")]
        CAMAccountManager = 4,

        [StringValue("CTM Opportunity Manager")]
        OpportunityManager = 5,

        [StringValue("Dynamics SSP")]
        DynamicsSSP = 6,

        [StringValue("Dynamics STU Lead")]
        DynamicsSTULead = 7,

        [StringValue("MBS BG Lead")]
        DynamicsBGLead = 8
    }
    */

    public enum NetworkUserFilterType
    {
        None = 0,
        TeamMember = 1,
        Manager = 2,
        SkipLevelManager = 3,
        PeerTeam = 4,
        PeerManager = 5,
        Customer = 6
        /*1 TM
2 Manager
3 SLM
4 Peer TM
5 Peer Mgr
6 Customer*/
    }

    public enum StandingType
    {
        You = 0,
        Previous = 1,
        Top = 2,
        Next = 3,
        Rest = 4
    }

    public enum WCSIStanding
    {
        BelowAverage = 1,
        Satisfactory = 2,
        VeryGood = 3,
        Excellent = 4,
        Outstanding = 5
    }

    [Flags()]
    public enum BarrierAnswers
    {
        [StringValue("None")]
        None = 0x0,

        [StringValue("Comfort level/experience")]
        ComfortLevel = 0x1,

        [StringValue("Commitment alignment")]
        CommitmentAlignment = 0x2,

        [StringValue("Compensation/incentives")]
        Compensation = 0x4,

        [StringValue("Empowerment")]
        Empowerment = 0x8,

        [StringValue("Manager direction & coaching")]
        ManagerDirection = 0x10,

        [StringValue("Readiness")]
        Readiness = 0x20,

        [StringValue("Sales tools")]
        SalesTools = 0x40,

        [StringValue("Time pressures/bandwidth")]
        TimePressure = 0x80,

        [StringValue("Challenge not listed")]
        ChallengeNotListed = 0x100,
    }

    public enum PathfinderType
    {
        You=1,
        ForYou=2
    }
}