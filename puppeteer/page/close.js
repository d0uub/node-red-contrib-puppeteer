module.exports = function (RED) {
  function PuppeteerPageClose (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
        this.status({fill:"green",shape:"dot",text:`Closing Tab...`});
        await msg.puppeteer.page.close()
        puppeteerCtx.page = (await puppeteerCtx.browser.pages())[0]
        this.status({fill:"grey",shape:"ring",text:`Tab closed`});
				this.context().flow.set("puppeteer", puppeteerCtx);
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
  RED.nodes.registerType('puppeteer-page-close', PuppeteerPageClose)
}
