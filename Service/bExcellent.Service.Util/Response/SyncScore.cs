using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.Util.Response
{
    public class SyncScoreCollection
    {
        /*Taken score*/

        public SyncScore TScore { get; set; }

        /*Received score*/

        public SyncScore RScore { get; set; }

        public PoeModules PoeScores { get; set; }

        public string ChildIndexName1 { get; set; }

        public string ChildIndexName2 { get; set; }
    }

    public class SyncScore
    {
        public List<SyncModuleScore> ModuleScores { get; set; }

        public int Poeid { get; set; }

        public int Feedbackid { get; set; }

        public string PoeName { get; set; }

        public double WcsiScore { get; set; }

        //     public double Childindex1Score { get; set; }

        //   public double Childindex2Score { get; set; }
    }

    public class SyncModuleScore
    {
        public int Moduleid { get; set; }

        public int ModuleOrderNumber { get; set; }

        public float TotalModulescore { get; set; }

        public string ModuleName { get; set; }

        public double? Modulescore { get; set; }

        public double? WeightageScore { get; set; }

        public List<SyncQuestionScore> QuestionScores { get; set; }

        public double ModuleScoreAvg { get; set; }

        public double ModuleScorePercentage { get; set; }
    }

    public class SyncQuestionScore : QuestionsGoal
    {
        public double Score { get; set; }

        public double ScorePercentage { get; set; }

        public bool IsShared { get; set; }

        public string FBDate { get; set; }
    }

    public class SyncWcsiDiff
    {
        public double Youtile { get; set; }

        public double Teamtile { get; set; }
    }
}