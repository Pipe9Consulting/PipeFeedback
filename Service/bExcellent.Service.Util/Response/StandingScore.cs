using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class Standing
    {
        public StandingScore TopPerformer { get; set; }

        public StandingScore NextinLine { get; set; }

        public StandingScore RestofCommunity { get; set; }

        public StandingScore Previous { get; set; }

        public StandingScore You { get; set; }

        public StandingScore SkipLevelmanager { get; set; }

        public StandingScore TeamMember { get; set; }

        public StandingScore PeerManager { get; set; }

        public StandingScore PeerTeamMember { get; set; }

        public StandingScore CustomerPartner { get; set; }
    }

    public class StandingNew
    {
        public StandingScore You { get; set; }

        public StandingScore Community { get; set; }

        public StandingScore Team { get; set; }

        public StandingScore Sherpas { get; set; }

        public Tenure Tenure { get; set; }
        public Tenure TeamTenure { get; set; }

        public StandingScore Previous { get; set; }

        public StandingScore SkipLevelmanager { get; set; }

        public StandingScore TeamMember { get; set; }

        public StandingScore PeerManager { get; set; }

        public StandingScore PeerTeamMember { get; set; }

        public StandingScore CustomerPartner { get; set; }

        public List<Module> PracticeAreaContent { get; set; }

        public int PoeGoal { get; set; }
    }

    public class StandingPAContent
    {
        public List<UserPOEMapping> RequestMembers { get; set; }

        public List<UserPOEMapping> ReceiveMembers { get; set; }

        public List<UserPOEMapping> Connect { get; set; }

        public StandingScore ManagerScore { get; set; }

        public List<Module> GetPracticeArea { get; set; }

        public string ManagerName { get; set; }

        public string PoeName { get; set; }
    }

    public class StandingScore
    {
        public List<ModuleScore> ModuleScores { get; set; }

        public int Poeid { get; set; }

        public int Feedbackid { get; set; }

        public string PoeName { get; set; }

        public double WcsiScore { get; set; }

        public double Childindex1Score { get; set; }

        public double Childindex2Score { get; set; }

        public string ChidIndex1Name { get; set; }

        public string ChidIndex2Name { get; set; }
    }

    public class DataDumbScore
    {
        public List<DataDumbModuleScore> ModuleScores { get; set; }

        public int Poeid { get; set; }

        public int Feedbackid { get; set; }

        public string PoeName { get; set; }

        public double WcsiScore { get; set; }
    }

    public class DataDumbModuleScore
    {
        public int Moduleid { get; set; }

        public string ModuleName { get; set; }

        public float TotalModuleScore { get; set; }

        public double? Modulescore { get; set; }

        public double? WeightageScore { get; set; }

        public List<DataDumbQuestionScore> QuestionScores { get; set; }

        public double ModuleScoreAvg { get; set; }

        public double ModuleScorePercentage { get; set; }
    }

    public class DataDumbQuestionScore
    {
        public int Questionid { get; set; }

        public string QuestionText { get; set; }

        public string ShortQuetionText { get; set; }
        public string ReportQuestion { get; set; }

        public double Score { get; set; }

        public double ScorePercentage { get; set; }
    }

    public class ModuleScore
    {
        public int Moduleid { get; set; }

        public string ModuleName { get; set; }

        public float TotalModuleScore { get; set; }

        public double? Modulescore { get; set; }

        public double? WeightageScore { get; set; }

        public List<QuestionScore> QuestionScores { get; set; }

        public double ModuleScoreAvg { get; set; }

        public double ModuleScorePercentage { get; set; }

        public int Moduleorder { get; set; }
    }

    public class QuestionScore
    {
        public int Questionid { get; set; }

        public string QuestionText { get; set; }

        public string ShortQuetionText { get; set; }

        public double Score { get; set; }

        public double ScorePercentage { get; set; }

        public double WeightageScore { get; set; }

        public string GoalDate { get; set; }

        public string GoalsetDate { get; set; }
        public string Answers { get; set; }
    }

    public class Tenure
    {
        public StandingScore TenureBelow12 { get; set; }

        public StandingScore TenureBelow36 { get; set; }

        public StandingScore TenureAbove36 { get; set; }
    }
}