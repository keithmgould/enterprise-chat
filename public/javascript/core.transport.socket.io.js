CHAT.namespace("CHAT.CORE");

CHAT.CORE.transport = (function () {
  var socket = io.connect("http://chat.local:3000"),
      sendables = ["new-message"];

  // not happy with the location of this functionality
  socket.on("new-message", function (msg) {
    CHAT.CORE.modules.emit({ type : "receive-message", data : msg});
  });

  return {
    emit : function (msg) {
      var sendable,
          i = 0;
      for( ; sendable = sendables[i++] ; ){
        if (sendable === msg.type){
          socket.emit(msg.type, msg.data );
        }
      }
    }
  };
})();
