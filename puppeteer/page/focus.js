module.exports = function (RED) {
  function PuppeteerPageFocus (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await puppeteerCtx.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Focus to ${selector}`});
        await puppeteerCtx.page.focus(selector)
        this.status({fill:"grey",shape:"ring",text:`Focused ${selector}`});
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      }
    }
    )
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-focus', PuppeteerPageFocus)
}
