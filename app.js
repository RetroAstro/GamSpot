const moment = require('./lib/moment/index')

App({
   onLaunch () {
      moment.locale('zh-cn')
      
      // invoke updateManager API ... 
   }
})
