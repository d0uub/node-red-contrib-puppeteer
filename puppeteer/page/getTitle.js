module.exports = function (RED) {
  function PuppeteerPageGetTitle (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        this.status({fill:"green",shape:"dot",text:`Getting title`});
				
        const value =  await puppeteerCtx.page.title();
        this.status({fill:"grey",shape:"ring",text:`${value}`});
				
        msg.payload = value;
        this.send(msg) 
      } catch(e) {
        this.status({fill:"red",shape:"ring",text:e});
        msg.payload = undefined;
        this.send(msg) 
      }
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-get-title', PuppeteerPageGetTitle)
}
