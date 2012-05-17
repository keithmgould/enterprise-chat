CHAT.Sandbox = function (core, module_selector) {

  var CONTAINER = $('#' + module_selector);

  return {
    dom : function () {
      return CONTAINER;
    },
    emit : function (msg) {
      core.modules.emit(msg);
    },
    on : function (msgs) {
      core.modules.on(msgs, module_selector);
    }
  }
}
