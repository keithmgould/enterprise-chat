CHAT.namespace("CHAT.CORE");

CHAT.CORE.MODULES = (function () {

  var moduleData = {};

  return {
    create_module : function (moduleID, creator) {
      moduleData[moduleID] = {
        create : creator,
        instance : null
      };
    },
    start : function(moduleID) {
      var mod = moduleData[moduleID];
      if (mod) {
        var sb = new CHAT.Sandbox(CHAT.CORE, moduleID);
        mod.instance = mod.create(sb);
        mod.instance.init();
      }
    },
    start_all : function () {
      var moduleID;
      for(moduleID in moduleData){
        this.start(moduleID);
      }
    },
    on : function (msgs, mod) {
      if (moduleData[mod]) {
          moduleData[mod].events = msgs;
      } else {
          this.log(1, "");
      }
    },
    emit : function (msg) {
        var mod;
        for (mod in moduleData) {
            if (moduleData.hasOwnProperty(mod)){
                mod = moduleData[mod];
                if (mod.events && mod.events[msg.type]) {
                    mod.events[msg.type](msg.data);
                }
            }
        }
        CHAT.CORE.transport.emit(msg);
    }
  }
})();
