module.exports = function (RED) {
  function PuppeteerPageSetCookie (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let cookie = config.cookie;

				if(!cookie && msg.cookie !== undefined){
					cookie = msg.cookie;
				}

        this.status({fill:"green",shape:"dot",text:`Setting Cookie to ${cookie}`});
        await puppeteerCtx.page.setCookie(...cookie)
        this.status({fill:"grey",shape:"ring",text:`Cookie set`});
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
      $("#node-input-cookie").val(config.cookie)
    }
  }
  RED.nodes.registerType('puppeteer-page-set-cookie', PuppeteerPageSetCookie)
}
