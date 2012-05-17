CHAT.CORE.modules.create_module("chatWindowModule", function (sb) {
  
  var thread = sb.dom().find("ul");

  return {
    init : function () {
      sb.on({
        "new-message" : this.addMessage,
        "receive-message" : this.addMessage
      });
    },
    destroy : function () {},
    addMessage : function (text) {
      thread.append("<li>" + text + "</li>");
      sb.dom().prop({scrollTop: sb.dom().prop("scrollHeight")});
    }
  };
});

CHAT.CORE.modules.create_module("textBoxModule", function (sb) {

  var messageTextBox = sb.dom().find("#message"),
      nameTextBox = sb.dom().find("#clientName"),
      button = sb.dom().find("#submitMessage");

  return {
    init : function () {
      that = this;
      messageTextBox.keydown(function (e) {
        if (e.which === 13){
         that.handleInput();
        }
      });
    },
    destroy : function () {},
    handleInput : function () {
      sb.emit({
        type : "new-message",
        data : nameTextBox.val() + ":  " + messageTextBox.val()
      });
      messageTextBox.val("");
    }
  };
});

CHAT.CORE.modules.start_all();
