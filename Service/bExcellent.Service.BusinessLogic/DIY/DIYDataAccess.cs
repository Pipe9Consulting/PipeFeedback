using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Response;

namespace bExcellent.Service.BusinessLogic.DIY
{
    public class DIYDataAccess
    {
        public void CalculateFrequency(List<DIYQuestions> questions, int precentageForSurvey)
        {
            var totalQuestions = questions.Count();
            var sumOfallWeightage = questions.Sum(a => a.Importance);
            precentageForSurvey = 100;
            foreach (var question in questions)
            {
                question.WeightagePerQuestion = ((double)question.Importance / sumOfallWeightage) * precentageForSurvey;
            }
        }
    }
}
