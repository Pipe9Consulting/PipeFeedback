using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.BusinessLogic.POE
{
    public class POEBL
    {
        #region Private Memeber

        /// <summary>
        /// Gets the data access.
        /// </summary>
        private POEBLDataAccess DataAccess
        {
            get
            {
                return new POEBLDataAccess();
            }
        }

        #endregion Private Memeber

        /// <summary>
        /// Gets the POE intro.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        public string GetPOEIntro(int poeid)
        {
            return DataAccess.GetIntro(poeid, 0);
        }

        /// <summary>
        /// Gets the POE key action.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        public string GetPOEKeyAction(int poeid)
        {
            return DataAccess.GetKeyAction(poeid, 0);
        }

        /// <summary>
        /// Gets the module intro.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        public string GetModuleIntro(int poeid, int moduleId)
        {
            return DataAccess.GetIntro(poeid, moduleId);
        }

        /// <summary>
        /// Gets the module key action.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        public string GetModuleKeyAction(int poeid, int moduleId)
        {
            return DataAccess.GetKeyAction(poeid, moduleId);
        }

        /// <summary>
        /// Gets the practice area.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        public List<Module> GetPracticeArea(int poeid)
        {
            return DataAccess.GetModules(poeid);
        }

        /// <summary>
        /// Gets the questions.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        public List<Question> GetQuestions(int moduleId)
        {
            return DataAccess.GetModulesQuestionSet(moduleId);
        }

        /// <summary>
        /// Gets the question count.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public int GetQuestionCount(int poeid, int type)
        {
            return DataAccess.GetQuestionCount(poeid, type);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="poeid"></param>
        /// <returns></returns>
        public List<Module> GetSurveyModules(int poeid)
        {
            return DataAccess.GetSurveyModules(poeid);
        }
        public bool GetPoEResultMode(int userId, int poeid)
        {
            return DataAccess.GetPoEResultMode(userId, poeid);
        }
    }
}