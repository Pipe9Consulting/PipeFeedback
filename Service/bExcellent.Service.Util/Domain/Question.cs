using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class Question
    {
        public int QuestionId { get; set; }
        public int SubQuestionId { get; set; }

        public int QuestionOrderNumber { get; set; }

        public string QuetionText { get; set; }

        public string ShortQuetionText { get; set; }

        public bool IsBarrierQuestion { get; set; }

        public string SideBarTitle { get; set; }

        public int? Answer { get; set; }

        public string Comment { get; set; }

        public string Goaldate { get; set; }

        public User Manager { get; set; }

        public List<User> Sharedwith { get; set; }
        public List<SubQuestion> SubQuestion { get; set; }
        public int NetScore { get; set; }

        public int SelScore { get; set; }

        public string SetGoalDate { get; set; }

    }
    public class SubQuestion
    {
        public int QuestionId { get; set; }
        public int SubQuestionId { get; set; }

        public int QuestionOrderNumber { get; set; }

        public string QuetionText { get; set; }

       

    }
    public class CourseDetail
    {
        public int Courseid { get; set; }

        public string CourseContent { get; set; }

        public string CourseTitle { get; set; }

        public string CourseLink { get; set; }

        public int Contentlength { get; set; }

        public int LinkCount { get; set; }
    }
}