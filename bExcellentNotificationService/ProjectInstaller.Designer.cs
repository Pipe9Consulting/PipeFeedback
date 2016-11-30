namespace bExcellentNotificationService
{
    partial class ProjectInstaller
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.KessakuLiveNotificationServiceProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.KessakuLiveNotificationServiceInstaller = new System.ServiceProcess.ServiceInstaller();
            // 
            // KessakuLiveNotificationServiceProcessInstaller
            // 
            this.KessakuLiveNotificationServiceProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.KessakuLiveNotificationServiceProcessInstaller.Password = null;
            this.KessakuLiveNotificationServiceProcessInstaller.Username = null;
            // 
            // KessakuLiveNotificationServiceInstaller
            // 
            this.KessakuLiveNotificationServiceInstaller.Description = "KessakuLiveNotificationService";
            this.KessakuLiveNotificationServiceInstaller.DisplayName = "Kessaku Live Notification Service";
            this.KessakuLiveNotificationServiceInstaller.ServiceName = "KessakuLiveNotificationService";
            // 
            // ProjectInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.KessakuLiveNotificationServiceProcessInstaller,
            this.KessakuLiveNotificationServiceInstaller});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller KessakuLiveNotificationServiceProcessInstaller;
        private System.ServiceProcess.ServiceInstaller KessakuLiveNotificationServiceInstaller;
    }
}