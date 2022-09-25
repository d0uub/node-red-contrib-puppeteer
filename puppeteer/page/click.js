
module.exports = function (RED) {
  function PuppeteerPageClick (config) {
    RED.nodes.createNode(this, config)
    // Retrieve the config node
    config.clickCount = parseInt(config.clickCount)
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await puppeteerCtx.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Click ${selector}`});
        await puppeteerCtx.page.click(selector,config)
        this.status({fill:"grey",shape:"ring",text:`Clicked ${selector}`});
        this.send(msg) 
      } catch(e) {
          this.status({fill:"red",shape:"ring",text:e});
          this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-clickCount").val(config.clickCount)
      $("#node-input-delay").val(config.delay)
      $("#node-input-button").val(config.button)
      $("#node-input-name").val(config.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-click', PuppeteerPageClick)
}
