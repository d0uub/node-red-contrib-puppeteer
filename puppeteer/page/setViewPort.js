module.exports = function (RED) {
  function PuppeteerPageSetViewPort (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
        let w = config.viewport_w;
        let h = config.viewport_h;

				if(!w && msg.viewport_w !== undefined){
					w = msg.viewport_w;
				}
				if(!h && msg.viewport_h !== undefined){
					h = msg.viewport_h;
				}
				
				w = parseInt(w)
				h = parseInt(h)
				this.error("Set ViewPort: " + w + "x" + h);

        this.status({fill:"green",shape:"dot",text:`Setting ViewPort to ${w}x${h}`});
        await puppeteerCtx.page.setViewport({ width: w, height: h });
        this.status({fill:"grey",shape:"ring",text:`${w}x${h}`});
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
      //$("#node-input-name").val(this.name)
      $("#node-input-viewport_w").val(config.viewport_w)
      $("#node-input-viewport_h").val(config.viewport_h)
    }
  }
  RED.nodes.registerType('puppeteer-page-set-viewport', PuppeteerPageSetViewPort)
}
