(function () {

    var me = this;

    me.autenticar = function(usuario, senha){

        $.ajax({
            type: 'POST',
            url: Url.config.backEnd + '/Token',
            data: {
                'username': usuario,
                'password': senha,
                'grant_type': 'password'
            },
            success: function (resp) {
                
                Cookies.set("AppToken", resp.access_token, { expires: 1 });
                Cookies.set("AppUser", usuario, { expires: 1 });

                // $.ajax({
                    // type: 'POST',
                    // url: Url.config.backEnd + 'api/Usuarios/RecuperarPorUsuario',
                    // data: {
                        // 'Usuario': usuario
                    // },                  
					// beforeSend: function(xhr) {
						// xhr.setRequestHeader("Authorization", 'Bearer ' + resp.access_token);
					  // },
                    // success: function (resp) {

                        // Cookies.set("AppNomeCompleto", resp.Content.Dados.NomeCompleto, { expires: 1 });
                        // Cookies.set("AppTipoUsuario", resp.Content.Dados.TipoUsuario, { expires: 1 });
                        // //Cookies.set("AppFoto", 'data:image/jpeg;base64,' + resp.Content.Dados.Foto, { expires: 1 });
        
                        // onSubmitForm();
                    // },
                    // error: function(resp) {
                       // $('#errmsg').html(resp.responseJSON.error_description);
                    // },
                    // dataType: 'json',
                    // async: false
                // });


                onSubmitForm();
            },
            error: function(resp) {
               $('#errmsg').html(resp.responseJSON.error_description);
            },
            dataType: 'json',
            async: false
        });

    };

    me.autenticado = function(){

        var bearer = 'Bearer ' + Cookies.get('AppToken');

        $.ajax({
            type: 'POST',
            url: Url.config.backEnd + 'api/Usuarios/Autenticado',    
            headers: {
                "Authorization": bearer
            },      
            success: function (resp) {
                window.location.href = Url.config.frontEnd;
            },
            error: function(resp) {
                
            },
            dataType: 'json',
            async: false
        });

    };

})();
