namespace KessakuDemoNotification
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
            this.KessakuDemoNotificationProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.KessakuDemoNotificationServiceInstaller = new System.ServiceProcess.ServiceInstaller();
            // 
            // KessakuDemoNotificationProcessInstaller
            // 
            this.KessakuDemoNotificationProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.KessakuDemoNotificationProcessInstaller.Password = null;
            this.KessakuDemoNotificationProcessInstaller.Username = null;
            // 
            // KessakuDemoNotificationServiceInstaller
            // 
            this.KessakuDemoNotificationServiceInstaller.Description = "KessakuDemoNotificationService";
            this.KessakuDemoNotificationServiceInstaller.DisplayName = "Kessaku Demo Notification Service";
            this.KessakuDemoNotificationServiceInstaller.ServiceName = "KessakuDemoNotificationService";
            // 
            // ProjectInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.KessakuDemoNotificationProcessInstaller,
            this.KessakuDemoNotificationServiceInstaller});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller KessakuDemoNotificationProcessInstaller;
        private System.ServiceProcess.ServiceInstaller KessakuDemoNotificationServiceInstaller;
    }
}