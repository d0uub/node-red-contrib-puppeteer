module.exports = function (RED) {
  function PuppeteerPageGetCookie (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        this.status({fill:"green",shape:"dot",text:`Getting Cookies`});
        msg.payload = await puppeteerCtx.page.cookies()
        		
				this.status({fill:"grey",shape:"ring",text:`Cookies get`});
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
    }
  }
  RED.nodes.registerType('puppeteer-page-get-cookie', PuppeteerPageGetCookie)
}
