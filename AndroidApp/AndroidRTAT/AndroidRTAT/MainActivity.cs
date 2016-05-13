using System;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using System.Net;
using System.Collections.Specialized;

namespace AndroidRTAT
{
    [Activity(Label = "AndroidRTAT", MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity
    {
        int count = 1;

        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);

            // Get our button from the layout resource,
            // and attach an event to it
            Button button = FindViewById<Button>(Resource.Id.MyButton);
            
            button.Click += sendRequest;
        }

        void sendRequest(object sender, EventArgs ea)
        {
            var client = new WebClient();
            var data = new NameValueCollection()
            {
                {"lat", "39.180658" },
                {"long", "-96.575972" },
                {"userVal", "Commander" }

            };
            client.UploadValues("http://192.168.1.103/location", data);

        }
    }
}

