class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("https://codenchat.live:5000",{transports:["websocket","polling","flashsocket"]}),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets.."),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codenchat"}),e.socket.on("user_joined",(function(e){}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codenchat"})})),e.socket.on("recieve message",(function(s){console.log("message received",s.message);let t=$("<li>"),o="other-message";s.user_email==e.userEmail&&(o="self-message"),t.append($("<span>",{html:s.message})),t.append($("<sub>",{html:s.user_email})),t.addClass(o),$("#chat-message-list").append(t)}))}}