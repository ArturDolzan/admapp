(function()
{    
    var me = this;

    $(document).ready(function () {
        
        hub = $.connection.chatHub;
        //$.connection.hub.url = 'http://localhost:55090/signalr';
        $.connection.hub.url = 'https://tukazure.eastus.cloudapp.azure.com/apiadmapp/signalr/hubs';
          
        $.connection.hub.start()
        .done(function () {
            console.log('Conectado com sucesso signalr!'); 
        })
        .fail(function(){ 
            console.log('Falha ao conectar signalr!'); 
        });



        me.realTimeEnviarChatParaUsuario = function(usuarioDestino, msg) {
            hub.server.enviarMensagemParaUsuario(usuarioDestino, msg);
        };

        hub.client.publicarParaUsuario = function (mensagem) {			
            console.log(mensagem);
            alert(mensagem);
        };

    });
    
})();
