using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.DataAccess;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.BusinessLogic.POE
{
    public class POEBLDataAccess
    {
        #region Private Member

        private static DataContextFactory _factory;

        #endregion Private Member

        #region Private Property

        /// <summary>
        /// Gets the data context factory.
        /// </summary>
        private DataContextFactory DataContextFactory
        {
            get
            {
                if (_factory == null)
                {
                    _factory = new DataContextFactory();
                }
                return _factory;
            }
        }

        #endregion Private Property

        /// <summary>
        /// Gets the modules.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <returns></returns>
        public List<Module> GetModules(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSinglePOEModules(poeid)
                            .SelectMany((a, b) => new List<Module>
                                {
                                    new Module
                                    {
                                       ModuleId = a.POEModuleId,
                                       ModuleName = a.ModuleName,
                                       ModuleOrderNumber=a.ModuleOrder,
                                       Questions = GetModulesQuestionSet(a.POEModuleId),
                                       CourseDetail=GetModulesCourseDetail(a.POEModuleId),
                                       IndexType = (a.IndexType.HasValue) ? a.IndexType.Value : 0,
                                       Active = a.Active.GetValueOrDefault(),
                                       ModuleIntroSlideCount=a.IntroContentSlideCount.GetValueOrDefault(),
                                       KeyActionSlideCount=a.KeyActionSlideCount.GetValueOrDefault(),
                                       ModuleIntro = a.IntroContent,
                                       ModuleIntro1 = a.IntroContent1,
                                       ModuleIntro2 = a.IntroContent2,
                                       ModuleIntro3 = a.IntroContent3,
                                       ModuleIntro4 = a.IntroContent4,
                                       ModuleIntro5 = a.IntroContent5,
                                       KeyAction = a.KeyAction,
                                       KeyAction1 = a.KeyAction1,
                                       KeyAction2 = a.KeyAction2,
                                       KeyAction3 = a.KeyAction3,
                                       KeyAction4 = a.KeyAction4,
                                       KeyAction5 = a.KeyAction5,
                                    }
                                }).ToList();
            }
        }
        public List<Module> GetSurveyModules(int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSurveyModules(poeid)
                            .SelectMany((a, b) => new List<Module>
                                {
                                    new Module
                                    {
                                       ModuleId = a.SurveyModuleId,
                                       ModuleName = a.ModuleName,
                                       ModuleOrderNumber=a.ModuleOrder,
                                       Questions = GetSurveyModulesQuestionSet(a.SurveyModuleId),
                                       Active = a.Active.GetValueOrDefault(),
                                       ModuleIntro = a.IntroContent,
                                       
                                    }
                                }).ToList();
            }
        }
        public List<Question> GetSurveyModulesQuestionSet(int moduleId)
        {
            //  HtmlRemoval htmlRemoval = new HtmlRemoval();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSurveyModulesQuestionSet(moduleId)
                              .SelectMany((a, b) => new List<Question>
                                {
                                    new Question{
                                        QuestionId = a.QuestionId,
                                        QuestionOrderNumber = a.QuestionOrder,
                                        QuetionText =RemoveHtml(a.Question),
                                        SubQuestion=GetSurveyModulesSubQuestionSet(a.QuestionId)
                                       // ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        //SideBarTitle = a.SideBarText,
                                        //IsBarrierQuestion = a.QuestionType == 2
                                    }
                                }).ToList();
            }
        }
        public List<SubQuestion> GetSurveyModulesSubQuestionSet(int questionId)
        {
            //  HtmlRemoval htmlRemoval = new HtmlRemoval();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetSurveyModulesSubQuestionSet(questionId)
                              .SelectMany((a, b) => new List<SubQuestion>
                                {
                                    new SubQuestion{
                                        QuestionId = (int) a.QuestionId,
                                        QuestionOrderNumber = a.QuestionOrder,
                                        QuetionText =RemoveHtml(a.Question),
                                        SubQuestionId = a.SubQuestionId
                                       // ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        //SideBarTitle = a.SideBarText,
                                        //IsBarrierQuestion = a.QuestionType == 2
                                    }
                                }).ToList();
            }
        }

        /// <summary>
        /// Gets the modules question set.
        /// </summary>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        public List<Question> GetModulesQuestionSet(int moduleId)
        {
            //  HtmlRemoval htmlRemoval = new HtmlRemoval();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                return context.GetModulesQuestionSet(moduleId)
                              .SelectMany((a, b) => new List<Question>
                                {
                                    new Question{
                                        QuestionId = a.QuestionId,
                                        QuestionOrderNumber = a.QuestionOrder,
                                        QuetionText =RemoveHtml(a.Question),
                                        ShortQuetionText = RemoveHtml(a.ShortQuestion),
                                        SideBarTitle = a.SideBarText,
                                        IsBarrierQuestion = a.QuestionType == 2
                                    }
                                }).ToList();
            }
        }

        public List<CourseDetail> GetModulesCourseDetail(int moduleId)
        {
            //  HtmlRemoval htmlRemoval = new HtmlRemoval();
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var returnValue = context.GetPoeCourseDetail(moduleId);
                if (returnValue != null)
                {
                    return returnValue
                        .SelectMany((a, b) => new List<CourseDetail>
                                                  {
                                                      new CourseDetail
                                                          {
                                                              Courseid = a.CourseId,
                                                              CourseContent = a.CourseContent,
                                                              CourseTitle = a.CourseTitle,
                                                              CourseLink = a.CourseLink,
                                                              Contentlength=(int) a.ContentLength,
                                                              LinkCount=(int) a.LinkCount
                                                          }
                                                  }).ToList();
                }
                return null;
            }
        }

        /// <summary>
        /// Gets the question count.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public int GetQuestionCount(int poeid, int type)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var count = context.GetTotalQuestionCount(poeid).SingleOrDefault();
                return Convert.ToInt32(count.Column1);
            }
        }

        /// <summary>
        /// Removes the HTML.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public string RemoveHtml(string text)
        {
            string returntext = string.Empty;

            returntext = text.Replace("<p><strong>", "").Replace("</strong></p>", "");

            return returntext;
        }

        /// <summary>
        /// Removes the indetail HTML.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public string RemoveIndetailHtml(string text)
        {
            string returntext = string.Empty;

            returntext = text.Replace("<strong>", "").Replace("</strong>", "").Replace("<p>", "").Replace("</p>", "").Replace("In Detail:", "");

            return returntext;
        }

        /// <summary>
        /// Gets the intro.
        /// </summary>
        /// <param name="poeid">The poeid.</param>
        /// <param name="moduleId">The module id.</param>
        /// <returns></returns>
        public string GetIntro(int poeid, int moduleId)
        {
            return GetModules(poeid).Where(a => a.ModuleOrderNumber == moduleId).Select(a => a.ModuleIntro).FirstOrDefault();
        }

        public string GetKeyAction(int poeid, int moduleId)
        {
            return GetModules(poeid).Where(a => a.ModuleOrderNumber == moduleId).Select(a => a.KeyAction).FirstOrDefault();
        }
        public bool GetPoEResultMode(int userId,int poeid)
        {
            using (var context = DataContextFactory.GetIntelliSetDataContext())
            {
                var result = context.GetPoeResultMode(userId, poeid).FirstOrDefault();
               if(result != null && result.IsFeedback!=0)
               {
                   return true;
               }
                return false;
            }
        }
    }
}