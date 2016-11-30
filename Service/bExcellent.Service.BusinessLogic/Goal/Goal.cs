using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.BusinessLogic.Goal
{
    public class Goal
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private GoalDataAccess DataAccess
        {
            get
            {
                return new GoalDataAccess();
            }
        }

        #endregion Private Memeber


        public void CreateMyGoal(int userId, int poeId, int questionId, int selectedValue, DateTime goalDate)
        {
            DataAccess.CreateMyGoal(userId, poeId, questionId, selectedValue, goalDate);
        }

        public List<ModulesGoal> GetMyGoals(int poeid, int userid)
        {
            return DataAccess.GetMyGoals(poeid, userid);
        }

        public void SaveGoal(GoalShare goalShare)
        {
            DataAccess.SaveGoal(goalShare);
        }
        public void SaveGoals(List<GoalShare> goalShares)
        {
            DataAccess.SaveGoals(goalShares);
        }

        public List<QuestionLists> GetQuestionsList(int poeid)
        {

            return DataAccess.GetQuestionsList(poeid);
        }

    }
}
