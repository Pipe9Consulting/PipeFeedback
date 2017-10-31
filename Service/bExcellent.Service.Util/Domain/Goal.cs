using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.Util.Domain
{
    public class Goal : POE
    {
        public List<ModulesGoal> ModulesGoals { get; set; }
    }

    public class QuestionsGoal : Question
    {
        public int SelectedGoalValue { get; set; }

        public int Goal { get; set; }

        public int GoalGap { get; set; }

        public DateTime GoalSetedOn { get; set; }

        public string GoalSetedOnStr { get; set; }

        public int GoalMonthDiff { get; set; }

        public bool GoalExpired { get; set; }

        public int GoalCompletedMonth { get; set; }

        public bool IsGoalShared { get; set; }
    }

    public class ModulesGoal : Module
    {
        public List<QuestionsGoal> QuestionsGoals { get; set; }
    }

    [DataContract(Namespace = "", Name = "GoalShare")]
    [Serializable]
    public class GoalShare
    {
        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public int PoeId { get; set; }

        [DataMember]
        public int SubId { get; set; }

        [DataMember]
        public int QuestionId { get; set; }

        [DataMember]
        public int SelectedValue { get; set; }

        [DataMember]
        public int SharedWithId { get; set; }

        [DataMember]
        public DateTime GoalDate { get; set; }

    }

    [DataContract(Namespace = "", Name = "AssignPoe")]
    [Serializable]
    public class AssignPoe
    {
        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public int PoeId { get; set; }

        [DataMember]
        public int SubId { get; set; }

        [DataMember]
        public string JobTitle { get; set; }

        [DataMember]
        public int DesignationId { get; set; }

        [DataMember]
        public string Emailid { get; set; }
    }

    public class QuestionLists
    {
        [DataMember]
        public int QuestionId { get; set; }

        [DataMember]
        public int PoeModuleId { get; set; }

        [DataMember]
        public string Questions { get; set; }

        [DataMember]
        public int QuestionOrder { get; set; }

        [DataMember]
        public int POEId { get; set; }

        [DataMember]
        public string ModuleName { get; set; }

        [DataMember]
        public string Priority { get; set; }

        public List<QuestionLists> QuestionList { get; set; }
    }

    public class Goals
    {
        public int ModuleId { get; set; }

        public int ModuleOrderNumber { get; set; }

        public int POEId { get; set; }

        public string ModuleName { get; set; }

        public int UserId { get; set; }

        public List<Question> question { get; set; }
    }

    public class TrackGoal
    {
        public StandingScore Netdata { get; set; }
        public SyncScore Youdata { get; set; }
    }
    public class DevelopmentPriorities
    {
        public int ManagerResult { get; set; }
        public int SelfResult { get; set; }
        public int ManagerCapability { get; set; }
        public int SelfCapability { get; set; }
        public int QuestionId { get; set; }
        public int Rating { get; set; }
        public string Question { get; set; }
        public string ModuleName { get; set; }
        public int ModuleOrder { get; set; }
        public int Bucketorder { get; set; }
        public int ManagerMappingId { get; set; }
        public int CurrentFeedbackId { get; set; }
        public int TeamId { get; set; }
        public int ManagerRating { get; set; }
        public int SelfRating { get; set; }
    }
    public class Results
    {
        public int CurrrentResult { get; set; }
        public int PreviousResult { get; set; }
        public int CurrrentCapability { get; set; }
        public int PreviousCapability { get; set; }
        public int CurrrentImportance { get; set; }
        public int PreviousImportance { get; set; }
        public int QuestionId { get; set; }
        public int ModuleId { get; set; }
        public string Question { get; set; }
        public string ModuleName { get; set; }
        public int ModuleOrder { get; set; }
        public bool IsDevelopmentPriorities { get; set; }
    }
    public class GoalDate
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int RemainingDays { get; set; }
        public int CompletedDays { get; set; }
        public int OverallScore { get; set; }
    }
    public class DevlopmentPriority
    {
        public int FeedbackFrom { get; set; }
        public int FeedbackFor { get; set; }
        public int Questionid { get; set; }
        public int PriorityOrder { get; set; }
        public int ManagerResult { get; set; }
        public int CurrentFeedbackId { get; set; }
        public bool Active { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}