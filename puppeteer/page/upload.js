module.exports = function (RED) {
  function PuppeteerPageUpload (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let selector = config.selectortype!="str"?eval(config.selectortype+"."+config.selector):config.selector
        let file = config.filetype!="str"?eval(config.filetype+"."+config.file):config.file
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await puppeteerCtx.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Upload ${file}`});
        await (await puppeteerCtx.page.$(selector)).uploadFile(file)
        this.status({fill:"grey",shape:"ring",text:`Uploaded ${file}`});
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
  RED.nodes.registerType('puppeteer-page-upload', PuppeteerPageUpload)
}
