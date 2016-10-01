/* jshint sub:true */
/* jshint expr:true */
/* globals ga */
export default class GoogleAnalytics
{
  static init(params) {

    if (!this.isInitialized())
    {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      
      ga('create', params.ua, 'auto');
    }
  }
  static isInitialized() {
    
    return (typeof window.ga !== "undefined");
  }
  static sendEvent(options) {

    if (!this.isInitialized())
    {
      return;
    }
    window.ga("send", "event", options.category, options.action, options.label, options.value, {
      nonInteraction: true
    });
  }
  static sendPageView(options) {
    
    var trackerParams;

    if (!this.isInitialized())
    {
      return;
    }
    trackerParams = {};
    if (typeof options.page === "string")
    {
      trackerParams.page = options.page;
    }
    if (typeof options.title === "string")
    {
      trackerParams.title = options.title;
    }
    window.ga("send", "pageview", trackerParams);
  }
}