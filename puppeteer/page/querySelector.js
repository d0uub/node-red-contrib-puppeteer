module.exports = function (RED) {
  function PuppeteerDocumentQuerySelector (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    this.property = config.property
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
				let puppeteerCtx = this.context().flow.get("puppeteer");
				
      node.selector = config.selectortype=="msg"?msg[node.selector]:node.selector
      node.selector = config.selectortype=="flow"?flowContext.get(node.selector):node.selector
      node.selector = config.selectortype=="global"?globalContext.get(node.selector):node.selector
      const selector = 'a'
      const property = 'innerText'
      puppeteerCtx.page.evaluate(({selector, property}) => {
        return document.querySelector(selector)[property]
      },{ 
        selector: this.selector, 
        property: this.property 
      })
      .then((payload) => {
        msg.payload = payload
        node.send(msg)
      })
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
      $("#node-input-selector").val(this.selector)
      $("#node-input-property").val(this.property)
    }
  }
  RED.nodes.registerType('puppeteer-page-document-querySelector', PuppeteerDocumentQuerySelector)
}
