module.exports = function (RED) {
  function PuppeteerPageContent (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
				let puppeteerCtx = this.context().flow.get("puppeteer");
      puppeteerCtx.page.content()
        .then((content) => {
          puppeteerCtx.content = content
          this.send(msg) 
        })  
    })
		this.on('close', function() {
			this.status({});
		})
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-content', PuppeteerPageContent)
}