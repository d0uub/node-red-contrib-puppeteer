module.exports = function (RED) {
  function PuppeteerPageKeyboardPress (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        this.status({fill:"green",shape:"dot",text:`Pressing Key ${config.key}`});
        await puppeteerCtx.page.keyboard.press(config.key)
        this.status({fill:"grey",shape:"ring",text:`Pressed Key ${config.key}`});
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
      $("#node-input-key").val(this.key)
    }
  }
  RED.nodes.registerType('puppeteer-page-keyboard-press', PuppeteerPageKeyboardPress)
}
