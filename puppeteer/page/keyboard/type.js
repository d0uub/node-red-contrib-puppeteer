module.exports = function (RED) {
  function PuppeteerPageKeyboardType (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let text = config.text
        text = config.texttype=="msg"?msg[config.text]:text
        text = config.texttype=="flow"?flowContext.get(config.text):text
        text = config.texttype=="global"?globalContext.get(config.text):text
        this.status({fill:"green",shape:"dot",text:`Typing ${text}`});
        await puppeteerCtx.page.keyboard.type(text)
        this.status({fill:"grey",shape:"ring",text:`Typed ${text}`});
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
  RED.nodes.registerType('puppeteer-page-keyboard-type', PuppeteerPageKeyboardType)
}
