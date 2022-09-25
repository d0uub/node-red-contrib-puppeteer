module.exports = function (RED) {
  function PuppeteerPageSetValue (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        let value = config.valuetype!="str"?eval(config.valuetype+"."+config.value):config.value
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await puppeteerCtx.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Setting ${selector}:${value}`});
        while ((await puppeteerCtx.page.$eval(selector, el => el.value))!=value)
          await puppeteerCtx.page.$eval(selector, (el,value) => el.value = value, value)
        this.status({fill:"grey",shape:"ring",text:`${selector}:${value}`});
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
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-set-value', PuppeteerPageSetValue)
}
