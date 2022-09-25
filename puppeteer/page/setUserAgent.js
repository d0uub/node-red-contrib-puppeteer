module.exports = function (RED) {
  function PuppeteerPageSetUserAgent (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");

        let useragent = config.useragent;

				if(!useragent && msg.useragent !== undefined){
					useragent = msg.useragent;
				}

				this.error("Set UserAgent: " + useragent);

        this.status({fill:"green",shape:"dot",text:`Setting User Agent to ${useragent}`});
        await puppeteerCtx.page.setUserAgent(useragent)
        this.status({fill:"grey",shape:"ring",text:`${useragent}`});
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      }
      })
      this.on('close', function() {
        this.status({});
      });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
      $("#node-input-useragent").val(config.useragent)
    }
  }
  RED.nodes.registerType('puppeteer-page-setuseragent', PuppeteerPageSetUserAgent)
}
