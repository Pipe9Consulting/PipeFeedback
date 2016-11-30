using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IFeedback" in both code and config file together.
    //  [ServiceContract]
    public interface IFeedback
    {
        int GetFeedbackGivenCount(int userId, int poeId);

        int GetFeedbackReceivedCount(int userId, int poeId);

        string GetPOEIntro(int poeid);

        string GetModuleIntro(int poeid, int moduleId);

        string GetPOEKeyAction(int poeid);

        string GetModuleKeyAction(int poeid, int moduleId);

        List<Module> GetPracticeArea(int poeid);

        List<Question> GetQuestions(int moduleId);
    }
}