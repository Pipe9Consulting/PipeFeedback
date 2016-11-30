using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bExcellent.Service.Util.Domain
{
    public class Module
    {
        public int ModuleId { get; set; }

        public int ModuleOrderNumber { get; set; }

        public int POEId { get; set; }

        public string ModuleName { get; set; }

        public IList<Question> Questions { get; set; }

        public List<CourseDetail> CourseDetail { get; set; }

        /* public string ModuleIntro { get; set; }

         public string KeyAction { get; set; }*/

        public int ModuleIntroSlideCount { get; set; }

        public int KeyActionSlideCount { get; set; }

        public string ModuleIntro { get; set; }

        public string ModuleIntro1 { get; set; }

        public string ModuleIntro2 { get; set; }

        public string ModuleIntro3 { get; set; }

        public string ModuleIntro4 { get; set; }

        public string ModuleIntro5 { get; set; }

        public string KeyAction { get; set; }

        public string KeyAction1 { get; set; }

        public string KeyAction2 { get; set; }

        public string KeyAction3 { get; set; }

        public string KeyAction4 { get; set; }

        public string KeyAction5 { get; set; }

        public bool Active { get; set; }

        public int IndexType { get; set; }
    }
}