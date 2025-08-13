sap.ui.define(["sap/ui/core/UIComponent"], function (BaseComponent) {
  "use strict";

  /**
   * @namespace be.nmbs.shellplugin
   */
  const Component = BaseComponent.extend("be.nmbs.shellplugin.Component", {
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"]
    },
    init: async function _init() {
      // call the base component's init function
      BaseComponent.prototype.init.call(this);

      // call the base component's init function
      BaseComponent.prototype.init.call(this);
      //@ts-ignore

      var _paq = window._paq = window._paq || [];
      _paq.push(["setDomains", ["*.hana.ondemand.com"]]);
      _paq.push(['enableLinkTracking']);
      _paq.push(['setDocumentTitle', document.title]);
      _paq.push(['setCustomUrl', document.URL]);
      _paq.push(['trackPageView']);

      //fetch de workzone id from cap
      const piwikid = await this.fetchWorkzoneID();
      const url = sap.ui.require.toUrl("be/nmbs/shellplugin") + "/Piwik/";
      _paq.push(['setTrackerUrl', url + 'piwik.php']);
      _paq.push(['setSiteId', piwikid]);
      var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript';
      g.async = true;
      g.defer = true;
      g.src = url + "piwik.js";
      console.log(piwikid);

      //@ts-ignore
      s.parentNode.insertBefore(g, s);
      var currentUrl = location.href;
      window.addEventListener("hashchange", () => {
        _paq.push(['setReferrerUrl', currentUrl]);
        currentUrl = document.URL;
        _paq.push(['setCustomUrl', document.URL]);
        _paq.push(['setDocumentTitle', this.getHash()]);
        _paq.push(['trackPageView']);

        // var content = document.getElementById('content');
        _paq.push(['MediaAnalytics::scanForMedia', document]);
        _paq.push(['FormAnalytics::scanForForms', document]);
        _paq.push(['trackContentImpressionsWithinNode', document]);
        _paq.push(['enableLinkTracking']);
        //@ts-ignore
        piwik_log(this.getHash(), piwikid, url + 'piwik.php');
      }, false);
    },
    /**
     * getHash
     */
    getHash: function _getHash() {
      let newHash = location.hash;
      if (newHash.indexOf("?") > -1) {
        newHash = location.hash.substr(0, location.hash.indexOf("?"));
      }
      newHash = newHash.indexOf("&") > -1 ? newHash.substr(0, newHash.indexOf("&")) : newHash;
      return newHash;
    },
    fetchWorkzoneID: async function _fetchWorkzoneID() {
      try {
        const oModel = this.getModel();
        const oBinding = oModel?.bindContext(`/getWorkzoneID(...)`, undefined, {});
        await oBinding?.execute();
        const oContext = oBinding?.getBoundContext();
        if (!oContext) {
          console.warn("No context returned from getWorkzoneID");
          return "";
        }
        const data = oContext.getObject();
        if (data && data.value) {
          console.log("Workzone ID:", data.value);
          return data.value;
          // use data.value here as needed
        } else {
          console.warn("No data.value found in context");
          return "";
        }
      } catch (error) {
        console.error("Error fetching Workzone ID", error);
        return "";
      }
    }
  });
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
