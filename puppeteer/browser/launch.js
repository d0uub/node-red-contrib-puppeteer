const puppeteer = require('puppeteer')

module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
  
    RED.nodes.createNode(this, config);

    config.defaultViewport = null;
  
    // Retrieve the config node
    this.on('input', async function (msg, send, done) {

			this.status({fill:"green",shape:"dot",text:"Launching..."});

			let puppeteerCtx; 

			let headless = config.headless;
			let stealth = config.stealth;
			let ignorehttpserrors = config.ignorehttpserrors;
			
			let debugip = config.debugip;
			let debugport = config.debugport;

			if(!headless && msg.headless !== undefined) {
				headless = msg.headless;
			}
			if(!stealth && msg.stealth !== undefined) {
				stealth = msg.stealth;
			}
			if(!ignorehttpserrors && msg.ignorehttpserrors !== undefined) {
				ignorehttpserrors = msg.ignorehttpserrors;
			} 
			if(!debugip && msg.debugip !== undefined) {
				debugip = msg.debugip;
			}
			if(!debugport && msg.debugport !== undefined) {
				debugport = msg.debugport;
			}
			
			let url = "http://" +  debugip + ":" + debugport;
			let urlflags = "";
			
			if (!headless)
			{
				urlflags += "&headless=0";
			}
			if (stealth)
			{
				urlflags += "&stealth";
			}
			if (ignorehttpserrors)
			{
				urlflags += "&ignoreHTTPSErrors";
			}
			if (urlflags.length > 0)
			{
				urlflags = "?" + urlflags.substring(1);
			}
			
			this.error("Connect: " + url + "/" + urlflags);
			
			try {
				puppeteerCtx = {browser:await puppeteer.connect({...config,browserURL:`${url}/${urlflags}, slowMo: 15`})};
				
				this.status({fill:"grey",shape:"ring",text:"Attached to existing browser"});
			} catch (e) {
				this.error("No existing browser detected...");
				this.error("Connect failed: " + e);
				this.status({fill:"green",shape:"dot",text:"No existing browser detected..."});
			}

			if (puppeteerCtx==undefined) {
					this.status({fill:"grey",shape:"ring",text:"No existing browser detected..."});
					this.error("Connect failed: " + e);
			}
			
			try {
				puppeteerCtx.page = await puppeteerCtx.browser.newPage();
				//puppeteerCtx.page = (await puppeteerCtx.browser.pages())[0]
				puppeteerCtx.page.setDefaultTimeout(config.timeout)
				puppeteerCtx.page.setDefaultNavigationTimeout(0)
			} catch (e) {
				this.status({fill:"red",shape:"ring",text:e});
				this.error("E2" + e)
			}
      				
      try {    

        //Randomize viewport size
        await puppeteerCtx.page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 1080 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false
        });


				await puppeteerCtx.page._client.send('Emulation.clearDeviceMetricsOverride');
        
				this.context().flow.set("puppeteer", puppeteerCtx);
           
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error("E3" + e)
      }
      
      if (done) {
        done();
      }
    })

    this.on('close', function(done) {
      this.status({});
      done();
    });

    oneditprepare: function oneditprepare() {
      $("#node-input-timeout").val(config.timeout)
      $("#node-input-slowMo").val(config.slowMo)
      $("#node-input-headless").val(config.headless)
      $("#node-input-stealth").val(config.stealth)
      $("#node-input-ignorehttpserrors").val(config.ignorehttpserrors)
      $("#node-input-debugip").val(config.debugip)
      $("#node-input-debugport").val(config.debugport)
      $("#node-input-devtools").val(config.devtools)
      $("#node-input-name").val(config.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}
