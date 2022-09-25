module.exports = function (RED) {
  function PuppeteerPageGoto (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let url = config.url;
				
				if(!url && msg.url !== undefined){
					url = msg.url;
				}
        
				this.status({fill:"green",shape:"dot",text:`Go to ${url}`});
        await puppeteerCtx.page.goto(url,config)
        this.status({fill:"grey",shape:"ring",text:url});
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
      $("#node-input-waitUntil").val(this.waitUntil)
    }
  }
  RED.nodes.registerType('puppeteer-page-goto', PuppeteerPageGoto)
}
