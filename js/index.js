/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var user = {
    correo :'',
    password :'',
    recordarPassword: 'false',
    nombre: '',
    avatar: '',
    accept_reject_request: function(id_other_user,tipo,boton){
    	if(tipo=='aceptar'){
    		var data= {
              	 accion: 'accept_follow_request',
               	 user_email: user.correo,
               	 user_pass: user.password,
               	 id_follower: id_other_user
                }
    	}else if(tipo=='rechazar'){
    		var data = {
              	 accion: 'reject_follow_request',
              	 user_email: user.correo,
              	 user_pass: user.password,
              	 id_follower: id_other_user
               }
    	}
    	$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: data,
            type: 'post',
            timeout: 15000,
            beforeSend: function(){
           	 boton.html(app.loader_mini);
           	 boton.attr('disabled',true);
            },
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b));
                if(tipo=='aceptar'){
                	boton.html('<i class="fa fa-plus" aria-hidden="true"></i>');
                }else if(tipo=='rechazar'){
                	boton.html('<i class="fa fa-times" aria-hidden="true"></i>');
                }
                
                boton.attr('disabled',false);
            },
            success: function(a){
            	console.log(a);
            	if(a=='1'){
            		boton.parents('.li-follow-request-perfil').remove();
    				if(tipo=='aceptar'){
    					var element =$('#cant_seguidores');
        				var cant = parseInt(element.html());
        				cant +=1;
        				element.html(cant);
    				}
            	}else{
            		if(tipo=='aceptar'){
                    	boton.html('<i class="fa fa-plus" aria-hidden="true"></i>');
                    }else if(tipo=='rechazar'){
                    	boton.html('<i class="fa fa-times" aria-hidden="true"></i>');
                    }
                    
                    boton.attr('disabled',false);
            	}
                
                
            },
            complete: function(){
                
                
            }

   	 });
    },
    follow_request: function(id_other_user, desde){
    	if(desde=='single_evento'){
    		var boton = $('#follow-request-'+id_other_user);
    	}else if(desde=='perfil'){
    		var boton = $('#follow-request-perfil-'+id_other_user);
    	}else if(desde=='search'){
    		var boton = $('#follow-request-search-'+id_other_user);
    	}
    	
    	
    	$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: {
           	 accion: 'add_invite_seguir',
           	 user_email: user.correo,
           	 user_pass: user.password,
           	 id_usuario: id_other_user
            },
            type: 'post',
            timeout: 15000,
            beforeSend: function(){
           	 boton.html(app.loader_mini);
           	 boton.attr('disabled',true);
            },
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b));
                boton.html('<i class="fa fa-plus" aria-hidden="true"></i>');
                boton.attr('disabled',false);
            },
            success: function(a){
            	console.log(a);
            	if(a=='1'){
            		if(desde=='single_evento'){
            			boton.html('<i class="fa fa-check" aria-hidden="true"></i>')
            		}else if(desde=='perfil'){
            			boton.html('')
            		}
            		
            	}else{
            		boton.html('<i class="fa fa-plus" aria-hidden="true"></i>');
                    boton.attr('disabled',false);
            	}
                
                
            },
            complete: function(){
                
                
            }

   	 });
    },
    initialize : function(){
    	user.recordarPassword = window.localStorage.getItem('recordarPassword');
    	console.log(user.recordarPassword);
        user.correo = window.localStorage.getItem('correo');
        console.log(user.correo);
        user.password = window.localStorage.getItem('password');
        console.log(user.password);
        if(user.recordarPassword==='true'){
        	loginScreen.recordarPassword.prop('checked',true);
        }else if(user.recordarPassword === 'false'){
        	loginScreen.recordarPassword.prop('checked',false);
        }
        if(user.recordarPassword != '' &&  user.correo != '' && user.password != '' && user.recordarPassword ==='true'){
        	
        	if(user.correo !==null && user.password !==null && (user.correo !== user.password && (isNaN(user.correo) && isNaN(user.password)))){
                //loginScreen.loginPantalla.hide();
                //carteleraScreen.eventosSubscreen.get();
        		console.log('entro login normal');
        		$('#loginEmail').val(user.correo);
        		$('#loginPassword').val(user.password);
        		loginButton.click();
                
            }else if(user.correo === user.password && !isNaN(user.correo) && !isNaN(user.password)){
            	fb.login();
            }
        }
        
    },
    setProps : function(correo, password,remember){
        user.correo = correo;
        user.password = password;
        user.recordarPassword = remember;
        window.localStorage.setItem('correo',correo);
        window.localStorage.setItem('password',password);
        window.localStorage.setItem('recordarPassword',remember);
    },
    logout: function(){
        window.localStorage.setItem('correo','');
        window.localStorage.setItem('password','');
        if(user.recordarPassword==='true'){
        	loginScreen.recordarPassword.prop('checked',true);
        }else if(user.recordarPassword === 'false'){
        	loginScreen.recordarPassword.prop('checked',true);
        }
        menuScreen.menu.hide();
        loginScreen.loginPantalla.show();
    }
};

var myModal = {
	modal : $('#myModal'),
	modalHeader : $('#myModalHeader'),
	modalBody : $('#myModalBody'),
	open : function(header, body){
		myModal.modalHeader.html(header);
        myModal.modalBody.html(body);
        myModal.modal.modal();
	}
};
var perfilScreen = {
	perfilPantalla: $('#perfil_screen'),
	subscribirse: $('#subscribirse_premier'),
	desubscribirse: $('#desubscribirse_premier'),
	actualizarDatos: $('#actualizar_datos'),
	wrapper: $("#wrapper_perfil"),
	amigosHtml: '<i class="fa fa-users" aria-hidden="true"></i>',
	privadoHtml: '<i class="fa fa-lock" aria-hidden="true"></i>',
	todosHtml: '<i class="fa fa-unlock" aria-hidden="true"></i>',
	header_seg: $('#header_seg'),
	seg_pantalla: $('#seguidos_seguidores_subscreen'),
	seg_list: $('#seg_list'),
	modal: $("modal_badges"),
	modal_body: $('#modal_badges_body'),
	showModal: function(tipo){
		perfilScreen.modal.show();
		
	},
	success:false,
	get_seg:function(tipo){
		perfilScreen.seg_list.html(app.loader_block);
		if(tipo=='siguiendo'){
			perfilScreen.header_seg.html("SEGUIDOS");
			perfilScreen.seg_pantalla.show('slide',{direction:'right'},'fast');
			var data = {
					accion: 'get_siguiendo',
					user_email: user.correo,
					user_pass: user.password
			};
		}else if(tipo=='seguidores'){
			perfilScreen.header_seg.html("SEGUIDORES");
			perfilScreen.seg_pantalla.show('slide',{direction:'right'},'fast');
			var data = {
					accion: 'get_seguidores',
					user_email: user.correo,
					user_pass: user.password
			};
		}
		$.ajax({
            url:app.url_ajax,
            dataType: 'html',
            data: data,
            type: 'post',
            timeout: 15000,
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
            },
            success: function(a){
           	    perfilScreen.seg_list.html(a);
           	    perfilScreen.seg_pantalla.show();
           	    if(tipo=='seguidores'){
           	    	$('.remove-seguidor').click(function(){
           	    		var id_unfollow = $(this).data('iduser');
           	    		var boton = $(this);
           	    		boton.html(app.loader_mini);
           	    		boton.attr('disabled',true);
           	    		perfilScreen.stop_following(id_unfollow,'remove',boton);
           	    	});
           	    }else if(tipo=='siguiendo'){
           	    	$('.stop-following').click(function(){
           	    		var id_unfollow = $(this).data('iduser');
           	    		var boton = $(this);
           	    		boton.html(app.loader_mini);
           	    		boton.attr('disabled',true);
           	    		perfilScreen.stop_following(id_unfollow,'stop',boton);
           	    		
           	    	});
           	    }
            },
            complete: function(){ 
            }
   	 });
	},
	stop_following:function(id_other,tipo,boton){
		if(tipo=='remove'){
			var data = {
				accion: "remove_follower",
	            user_email: user.correo,
	           	user_pass: user.password,	
	           	id_follower: id_other
			};
		}else if(tipo=='stop'){
			var data = {
				accion: "stop_following",
	            user_email: user.correo,
	           	user_pass: user.password,
	           	id_following: id_other
			};
		}
		$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: data,
            type: 'post',
            timeout: 15000,
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
                boton.html('<i class="fa fa-times" aria-hidden="true"></i>');
                boton.attr('disabled',false);
            },
            success: function(a){
           	    if(a=='1'){
           	    	boton.parents('li').remove();
           	    	if(tipo=='remove'){
           	    		var element = $('#cant_seguidores');
           	    		var cant = parseInt(element.html());
           	    		cant -=1;
           	    		if(cant<0){cant=0;}
           	    		element.html(cant);
           	    	}else if(tipo=='stop'){
           	    		var element = $('#cant_seguidos');
           	    		var cant = parseInt(element.html());
           	    		cant -=1;
           	    		if(cant<0){cant=0;}
           	    		element.html(cant);
           	    	}
           	    }else{
           	    	boton.html('<i class="fa fa-times" aria-hidden="true"></i>');
                    boton.attr('disabled',false);
           	    }
            },
            complete: function(){ 
            }
   	 });
	},
	update_privacidad: function(privacidad){
		$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: {
            	accion: "update_privacidad",
            	user_email: user.correo,
           	 	user_pass: user.password,
           	 	privacidad: privacidad
            },
            type: 'post',
            timeout: 15000,
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
            },
            success: function(a){
           	 console.log(a);
            },
            complete: function(){ 
            }
   	 });
	},
	navigator:function(tipo){
		if(tipo==1){
			$('#follow_requests_container').show();
			$('#activity_container').hide();
			$('#badges_container').hide();
		}else if(tipo==2){
			$('#activity_container').show();
			$('#follow_requests_container').hide();
			$('#badges_container').hide();
		}else if(tipo==3){
			$('#badges_container').show();
			$('#follow_requests_container').hide();
			$('#activity_container').hide();
		}
	},
	get: function(){
		$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: {
            	accion: "get_perfil",
            	user_email: user.correo,
           	 	user_pass: user.password
            },
            type: 'post',
            timeout: 15000,
            beforeSend: function(){
            	perfilScreen.wrapper.html(app.loader_block);
            },
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
            },
            success: function(a){
           	 
           	 perfilScreen.wrapper.html(a);
           	$('#form_perfil_datos_user input[type="text"],#form_perfil_datos_user input[type="email"]').focusin(function(){
           		console.log('input perfil');
            	perfilScreen.perfilPantalla.find('.container2').scrollTo(this);
            });
           	 $('.reject-follow-request').click(function(){
           		 var id = $(this).data('iduser');
           		user.accept_reject_request(id,'rechazar',$(this));
           	 });
           	 $('.accept-follow-request').click(function(){
           		var id = $(this).data('iduser');
           		user.accept_reject_request(id,'aceptar',$(this));
           	 });
           	 $('.follow-request-perfil').click(function(){
           		var id = $(this).data('iduser');
           		user.follow_request(id,'perfil');
           	 });
           	 $('.medalla').click(function(){
           		 //$(this).next().children().show('slide',{direction:'down'},'fast').delay(3000).hide('slide',{direction:'down'},'fast');
           		 perfilScreen.modal.showModal();
           	 });
           	 $('#privacidad_perfil').change(function(){
           		 var value = $(this).val();
           		 perfilScreen.update_privacidad(value);
           	 });
           	 $('#datos_perfil').click(function(){
           		 console.log('datos perfil click');
           		 $('.input_perfil_datos').attr('disabled',false);
           		 $('#div_botones_actualizar').show('fast');
           	 });
           	 $('#cancelar_actualizar').click(function(){
           		 $('#div_botones_actualizar').hide('fast');
           		$('.input_perfil_datos').attr('disabled',true);
           		 return false;
           	 });
           	 $('#actualizar_datos').click(function(){
           		 
           	 });
           	$('#form_perfil_datos_user').parsley().on('form:success',function(){
    			perfilScreen.success = true;
    			//$('#actualizar_datos').append(app.loader);
    			$('#actualizar_datos').prop('disabled',true);
            	console.log('success form parsley');
            });
    		$('#form_perfil_datos_user').parsley().on('form:submit',function(){
                console.log('actualizar');
                if(perfilScreen.success){
                	perfilScreen.success = false;
                	var formData = $('#form_perfil_datos_user').getFormData();
                	formData.accion = 'actualizar_perfil';
                	formData.user_email = user.correo;
                	formData.user_pass = user.password;
                	console.log(formData);
    	            perfilScreen.actualizar_datos(formData);
                }
                return false;
            });
            },
            complete: function(){
            	
            }

   	 });
	},
	actualizar_datos: function(formData){
		$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: formData,
            type: 'post',
            timeout: 15000,
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
            },
            success: function(a){
           	 console.log(a);
            },
            complete: function(){
            	$('#actualizar_datos').prop('disabled',false);
            	$('#div_botones_actualizar').hide();
           		$('.input_perfil_datos').attr('disabled',true);
                
            }

   	 });
	}
};
var comentariosScreen = {
		comentariosPantalla : $('#comentarios_screen'),
		ul: $('#comentarios_list'),
		listHtml: '',
		buttonSend: $('#btn-chat'),
		comentarioInput: $('#comentario_input'),
		id_evento: null,
		comment:function(){//insert_comentario_evento
			var comentario = comentariosScreen.comentarioInput.val();
			if(comentario==='' || comentariosScreen.id_evento===null){return true;}
			
			console.log(comentario);
			var cant_element = $('#cant-comment-'+comentariosScreen.id_evento);
			var cant = parseInt(cant_element.html());
			cant +=1;
			cant_element.html(cant);
			$.ajax({
	             url:app.url_ajax,
	             dataType: 'text',
	             data: {
	            	 accion: 'insert_comentario_evento',
	            	 user_email: user.correo,
	            	 user_pass: user.password,
	            	 comentario:comentario,
	            	 id_evento: comentariosScreen.id_evento,
	             },
	             type: 'post',
	             timeout: 15000,
	             beforeSend: function(){
	            	 comentariosScreen.buttonSend.append(app.loader_mini);
	            	 comentariosScreen.buttonSend.attr('disabled',true);
	             },
	             error: function(a,b,c){
	                 console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
	             },
	             success: function(a){
	            	 console.log(a);
	            	 if(a!='0'){
	            		 comentariosScreen.ul.append(a); 
	            		 comentariosScreen.comentarioInput.val('');
	            		 $('.delete-comment').click(function(){
		            		 var id = $(this).data('id');
		            		 comentariosScreen.deleteComment(id);
		            	 });
	            	 }else{
	            		 
	            	 }
	            	 
	             },
	             complete: function(){
	            	 comentariosScreen.buttonSend.html('ENVIAR');
	            	 comentariosScreen.buttonSend.attr('disabled',false);
	             }
	    	 });
		},
		get:function(){ // get_evento_comentario
			$.ajax({
	             url:app.url_ajax,
	             dataType: 'html',
	             data: {
	            	 accion: 'get_evento_comentarios',
	            	 user_email: user.correo,
	            	 user_pass: user.password,
	            	 id_evento: comentariosScreen.id_evento
	             },
	             type: 'post',
	             timeout: 15000,
	             beforeSend: function(){
	            	 comentariosScreen.ul.html(app.loader_block);
	             },
	             error: function(a,b,c){
	                 console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
	             },
	             success: function(a){
	            	 
	            	 comentariosScreen.ul.html(a);
	            	 $('.delete-comment').click(function(){
	            		 var id = $(this).data('id');
	            		 comentariosScreen.deleteComment(id);
	            	 });
	             },
	             complete: function(){
	                 
	                 
	             }

	    	 });
		},
		deleteComment: function(id_comment){
			console.log('delete '+id_comment);
			$('#comment-'+id_comment).remove();
			var cant_element = $('#cant-comment-'+comentariosScreen.id_evento);
			var cant = parseInt(cant_element.html());
			cant -=1;
			cant_element.html(cant);
			$.ajax({
	             url:app.url_ajax,
	             dataType: 'html',
	             data: {
	            	 accion: 'borrar_comentario',
	            	 user_email: user.correo,
	            	 user_pass: user.password,
	            	 comment_id: id_comment
	             },
	             type: 'post',
	             timeout: 15000,
	             beforeSend: function(){
	            	 
	             },
	             error: function(a,b,c){
	                 console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
	             },
	             success: function(a){
	             },
	             complete: function(){
	             }

	    	 });
		}
};
var promosScreen = {
	promosPantalla: $('#promos_screen'),
	wrapper: $('#wrapper_promos'),
	get_ajax : null,
	get: function(){
		if(promosScreen.get_ajax != null){return true;}
		promosScreen.wrapper.html(app.loader_block);
		promosScreen.get_ajax = $.ajax({
            url:app.url_ajax,
            dataType: 'html',
            data: {
           	 accion: 'get_promos',
           	 user_email: user.correo,
           	 user_pass: user.password
            },
            type: 'post',
            timeout: 15000,
            beforeSend: function(){
           	 
            },
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
            },
            success: function(a){
            	promosScreen.wrapper.html(a);
            	
            },
            complete: function(){
            	promosScreen.get_ajax = null;
            }

   	 });
	},
	navigator: function(tipo){
		if(tipo==1){
			$('#invitaciones_grupos').show();
			$('#list_grupos').hide();
		}else if(tipo==2){
			$('#invitaciones_grupos').hide();
			$('#list_grupos').show();
		}
	}
};
var musicaScreen = {
	musicaPantalla: $('#musica_screen'),
};
var checkinScreen = {
	checkinPantalla: $('#checkin_screen')
};
var proponerEventoScreen = {
	pantalla : $('#proponer_evento_screen'),
	form: $("#proponer_evento_form"),
	button: $("#proponerEventoButton"),
	success: false,
	clean: function(){
    	$(':input','#proponer_evento_form')
    	  .not(':button, :submit, :reset, :hidden')
    	  .val('')
    	  .removeAttr('checked')
    	  .removeAttr('selected');
    },
	bindEvents: function(){
		$('#proponer_evento_form input[type="text"]').focusin(function(){
        	proponerEventoScreen.pantalla.find('.container').scrollTo(this);
        });
		proponerEventoScreen.form.parsley().on('form:success',function(){
			proponerEventoScreen.success = true;
			proponerEventoScreen.button.append(app.loader);
			proponerEventoScreen.button.prop('disabled',true);
        	console.log('success form parsley');
        });
		proponerEventoScreen.form.parsley().on('form:error',function(){
			myModal.modalHeader.html('Oops');
	        myModal.modalBody.html('Debes llenar todos los campos requeridos');
	        myModal.modal.modal();
        });
        proponerEventoScreen.form.parsley().on('form:submit',function(){
            console.log('register');
            if(proponerEventoScreen.success){
            	proponerEventoScreen.success = false;
            	var formData = proponerEventoScreen.form.getFormData();
            	formData.accion = 'sugerir_evento';
            	formData.user_email = user.correo;
            	formData.user_pass = user.password;
            	console.log(formData);
	            proponerEventoScreen.proponer(formData);
            }
            return false;
        });
	},
	proponer: function(formData){
		$.ajax({
            url:app.url_ajax,
            dataType: 'text',
            data: formData,
            type: 'post',
            timeout: 15000,
            beforeSend: function(){
            },
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
                myModal.modalHeader.html('Oops');
    	        myModal.modalBody.html('Parece que hubo un error al proponer el evento. Por favor intenta de nuevo');
    	        myModal.modal.modal();
            },
            success: function(a){
           	 console.log(JSON.stringify(a));
           	
           	 proponerEventoScreen.pantalla.hide('slide',{direction:'right'},'fast');
           	 proponerEventoScreen.clean();
           	 myModal.modalHeader.html('&Eacute;xito');
           	 myModal.modalBody.html('Muchas gracias! Tu evento se ha propuesto exitosamente. Lo estaremos evaluando para agregarlo a nuestra cartelera!');
           	 myModal.modal.modal();
            },
            complete: function(){
            	proponerEventoScreen.button.html('PROPONER');
    			proponerEventoScreen.button.prop('disabled',false);
    			
            }

   	 });
	},
};
var proponerLugarScreen = {
	pantalla : $('#proponer_lugar_screen'),
	form: $('#proponer_lugar_form'),
	select: $('#tipo_evento_propuesta'),
	button: $("#proponerLugarButton"),
	success: false,
	buttonAgregarHorario: $('#agregar_horario'),
	clean: function(){
    	$(':input','#proponer_lugar_form')
    	  .not(':button, :submit, :reset, :hidden')
    	  .val('')
    	  .removeAttr('checked')
    	  .removeAttr('selected');
    },
	agregarHorario: function(cont){
		
		var htmlHorario= '<div class="dias-horario-propuesta">'
			        +'<div>'
				+'<span><button class="quitar-dias-horario"><i class="fa fa-minus-circle" aria-hidden="true"></i></button></span>'
			    +'<select style="margin:0!important;padding:0!important;" name="dias_atencion_lugar_propuesta'+cont+'" class="inputpz form-control" required multiple>'
			    	+'<option value="Lunes">Lunes</option>'
			    	+'<option value="Martes">Martes</option>'
			    	+'<option value="Mi&eacute;rcoles">Mi&eacute;rcoles</option>'
			    	+'<option value="Jueves">Jueves</option>'
			    	+'<option value="Viernes">Viernes</option>'
			    	+'<option value="S&acute;bado">S&aacute;bado</option>'
			    	+'<option value="Domingo">Domingo</option>'
			    +'</select>'
			+'</div>'
			+'<div style="overflow:hidden;">'
			    +'<div class="col-xs-6" style="padding: 0 5px 0 0!important;">'
			        +'<input onfocus="(this.type=\'time\')" type="text"  name="tiempo_inicio_lugar_propuesta'+cont+'" class="inputpz form-control " placeholder="Hora que abre"  required>'
			    +'</div>'
			    +'<div class="col-xs-6" style="padding:0 0 0 5px!important;">'
			        +'<input onfocus="(this.type=\'time\')" type="text"  name="tiempo_fin_lugar_propuesta'+cont+'" class="inputpz form-control " placeholder="Hora que cierra"  required>'
			    +'</div>'
			+'</div>'
			+'</div>';
		
			proponerLugarScreen.button.before(htmlHorario);
			$('.quitar-dias-horario').click(function(){
				console.log('click quitar dias horario');
				$(this).parents('.dias-horario-propuesta').remove();
				return false;
			});
		},
	bindEvents: function(){
		$('#proponer_lugar_form input[type="text"]').focusin(function(){
        	proponerLugarScreen.pantalla.find('.container').scrollTo(this);
        });
		proponerLugarScreen.select.change(function(){
			var value = $(this).val();
			if(value=='bar'){
				$('#proponer_lugar_logo').css('background-image','url(../www/img/icono_bar.png)');
			}else if(value=='discoteca'){
				$('#proponer_lugar_logo').css('background-image','url(../www/img/icono_discoteca.png)');
			}else if(value=='lounge'){
				$('#proponer_lugar_logo').css('background-image','url(../www/img/icono_lounge.png)');
			}else if(value=='restaurante'){
				$('#proponer_lugar_logo').css('background-image','url(../www/img/icono_restaurante.png)');
			}
		});
		proponerLugarScreen.buttonAgregarHorario.click(function(){
			console.log('click agregar dias horario');
			var cont = $('#proponer_lugar_form .dias-horario-propuesta').length + 1;
			console.log(cont);
			proponerLugarScreen.agregarHorario(cont);
			return false;
		});
		proponerLugarScreen.form.parsley().on('form:success',function(){
			proponerLugarScreen.success = true;
			proponerLugarScreen.button.append(app.loader);
			proponerLugarScreen.button.prop('disabled',true);
        	console.log('success form parsley');
        });
		proponerLugarScreen.form.parsley().on('form:error',function(){
			myModal.modalHeader.html('Oops');
	        myModal.modalBody.html('Debes llenar todos los campos requeridos');
	        myModal.modal.modal();
        });
		proponerLugarScreen.form.parsley().on('form:submit',function(){
            console.log('register');
            if(proponerLugarScreen.success){
            	proponerLugarScreen.success = false;
            	var formData = proponerLugarScreen.form.getFormData();
            	formData.accion = 'sugerir_lugar';
            	formData.user_email = user.correo;
            	formData.user_pass = user.password;
            	console.log(formData);
	            proponerLugarScreen.proponer(formData);
            }
            return false;
        });
	},
	proponer: function(formData){
		
		$.ajax({
            url:app.url_ajax,
            dataType: 'json',
            data: formData,
            type: 'post',
            timeout: 15000,
            beforeSend: function(){
            },
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
            },
            success: function(a){
           	 	console.log(JSON.stringify(a));
	           	 proponerLugarScreen.clean();
	           	$('#proponer_lugar_form .dias-horario-propuesta').each(function(index){
	           		if(index!==0){
	           			$(this).remove();
	           		}
	           	});
	           	proponerLugarScreen.pantalla.hide('slide',{direction:'right'},'fast');
	           	myModal.modalHeader.html('&Eacute;xito');
	          	myModal.modalBody.html('Muchas gracias! El lugar se ha propuesto exitosamente. Lo estaremos evaluando para agregarlo a nuestro listado!');
	          	myModal.modal.modal();
            },
            complete: function(){
            	proponerLugarScreen.button.html("PROPONER");
            	proponerLugarScreen.button.prop('disabled',false);
                
            }

   	 });
	}
};
var carteleraScreen = {
	carteleraPantalla : $('#cartelera_screen'),
	currentSubscreen:null,
	loadVariables: function(){
		carteleraScreen.currentSubscreen = carteleraScreen.eventosSubscreen.eventos;
	},
	clickHeart: function(tipo, id_evento,desde_single){
		var data = {
	            user_email: user.correo,
	            user_pass: user.password,
	            id_evento: id_evento
			};
		if(tipo===1){
			data.accion = 'me_interesa';
			var cant_element = $('#cant-int-'+id_evento);
			
			var cant = parseInt(cant_element.html());
			cant +=1;
			cant_element.html(cant);
			if(desde_single!==undefined && desde_single===true){
				var cant_single_element = $('#single-cant-int-'+id_evento);
				var corazon = $('#corazon-'+id_evento).find('i');
				cant_single_element.html(cant);
				corazon.removeClass('fa-heart-o');
       		 	corazon.addClass('fa-heart');
			}
			
			
		}else if(tipo===2){
			data.accion = 'no_me_interesa'; //desde sugerencias
		}else if(tipo===3){
			data.accion = 'ya_no_interesa';
			var cant_element = $('#cant-int-'+id_evento);
			var cant = parseInt(cant_element.html());
			cant -=1;
			if(cant<0){cant=0;}
			cant_element.html(cant);
			
			if(desde_single!==undefined && desde_single===true){
				var cant_single_element = $('#single-cant-int-'+id_evento);
				var corazon = $('#corazon-'+id_evento).find('i');
				cant_single_element.html(cant);
				corazon.removeClass('fa-heart');
       		 	corazon.addClass('fa-heart-o');
			}
		}
		console.log(JSON.stringify(data));
		$.ajax({
             url:app.url_ajax,
             dataType: 'text',
             data: data,
             type: 'post',
             timeout: 15000,
             beforeSend: function(){
             },
             error: function(a,b,c){
                 console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
             },
             success: function(a){
            	 console.log(JSON.stringify(a));
             },
             complete: function(){
                 
                 
             }

    	 });
	},
	singleSubscreen :{
		single : $('#single_evento'),
		wrapper: $('#single_evento_wrapper'),
		show:function(){console.log('el neuvo show')},
		get: function(id_evento){
			$.ajax({
	             url:app.url_ajax,
	             dataType: 'html',
	             data: {
	            	 accion: 'get_single_evento',
	            	 user_email: user.correo,
	            	 user_pass: user.password,
	            	 id_evento: id_evento
	            	 
	             },
	             type: 'post',
	             timeout: 15000,
	             beforeSend: function(){
	            	 carteleraScreen.singleSubscreen.wrapper.html(app.loader_block);
	             },
	             error: function(a,b,c){
	                 console.log('error '+JSON.stringify(a)+JSON.stringify(b));
	                 carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
	             },
	             success: function(a){
	                 
	                 carteleraScreen.singleSubscreen.wrapper.html(a);
	                 $('.follow-request').click(function(){
	                	 console.log('click');
	                	 var user_id = $(this).data('iduser');
	                	 console.log(user_id);
	                	 user.follow_request(user_id,'single_evento');
	                 });
	                 $(".boton_interes_evento_single").click(function(){
	                	 console.log('click boton interes single');
	                	 var id=$(this).data('id');
	                	 var first = $(this).find('i');
	                	 if(first.hasClass('fa-heart')){
	                		 first.removeClass('fa-heart');
	                		 first.addClass('fa-heart-o');
	                		 carteleraScreen.clickHeart(3,id,true); //ya no me interesa
	                	 }else{
	                		 first.removeClass('fa-heart-o');
	                		 first.addClass('fa-heart');
	                		 carteleraScreen.clickHeart(1,id,true); //me interesa
	                	 }
	                 });
	                 $('.comentar').click(function(){
	                	 comentariosScreen.id_evento = $(this).data('id');
	                	 comentariosScreen.get();
	                	 comentariosScreen.comentariosPantalla.show('slide',{direction:'right'});
	                 });
	             },
	             complete: function(){
	                 
	                 
	             }

	    	 });
		}
	},
	eventosSubscreen : {
		eventos : $('#listado_eventos'),
		checkbox : $('#check_eventos_listado'),
		corazon : $('#corazon_eventos_listado'),
		search : $('#search_eventos'),
		ul : $('#ul_eventos'),
		list: null, //'list_eventos',
		filtrar_corazon: function(){
			if(carteleraScreen.eventosSubscreen.checkbox.prop('checked')){
				carteleraScreen.eventosSubscreen.corazon.html('<i class="fa fa-heart" aria-hidden="true"></i>');
				if(carteleraScreen.eventosSubscreen.list!==null){
					carteleraScreen.eventosSubscreen.list.filter(function(item) {
						
						if (item.values().interes ==='si') {
						   return true;
						} else {
						   return false;
						}
						});
				}
			}else{
				carteleraScreen.eventosSubscreen.corazon.html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
				if(carteleraScreen.eventosSubscreen.ul.list!==null){
					carteleraScreen.eventosSubscreen.list.filter();
					}
				}
		},
		bindEvents : function(){
			//carteleraScreen.eventosSubscreen.checkbox.click();
			this.checkbox.click(function(){
				carteleraScreen.eventosSubscreen.filtrar_corazon();
			});
			//this.search.keydown(function(){
			this.search.on('input',function(){
				console.log('search change: '+$(this).val());
				if(carteleraScreen.eventosSubscreen.list!==null){
					if($(this).val()===''){
						carteleraScreen.eventosSubscreen.list.search();
					}else{
						carteleraScreen.eventosSubscreen.list.search($(this).val(),['nombre_evento','detalles_evento']);
					}
					
				}
			});
		},
		_show: function(){
			carteleraScreen.eventosSubscreen.eventos.show();
			carteleraScreen.lugaresSubscreen.lugares.hide();
			carteleraScreen.eventosSubscreen.get();
			
		},
		get: function(){
			console.log('entro get');
			$.ajax({
	             url:app.url_ajax,
	             dataType: 'html',
	             data: {
	            	 accion: 'get_list_eventos',
	            	 user_email: user.correo,
	            	 user_pass: user.password
	             },
	             type: 'post',
	             timeout: 15000,
	             beforeSend: function(){
	            	 carteleraScreen.eventosSubscreen.ul.html(app.loader_block);
	             },
	             error: function(a,b,c){
	                 console.log('error '+JSON.stringify(a)+JSON.stringify(b));
	                 carteleraScreen.eventosSubscreen.ul.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
	             },
	             success: function(a){
	                 
	                 carteleraScreen.eventosSubscreen.ul.html(a);
	                 if(carteleraScreen.eventosSubscreen.ul.children().length>0){
		                 var options = {
		                	valueNames: ['nombre_evento','detalles_evento',
		                	             {name:'interes', data:['interes']}
		                	             ]	 
		                 };
		                 carteleraScreen.eventosSubscreen.list = new List('list_eventos',options);
		                 $('.cover_photo, .logo, .info_evento').click(function(){
		                	 var id = $(this).parents('.evento').data('id');
		                	 carteleraScreen.singleSubscreen.get(id); 
		                	 carteleraScreen.singleSubscreen.single.show('slide',{direction:'left'},'fast');
		                	 
		                 });
		                 $(".boton_interes_evento").click(function(){
		                	 console.log('click interes evento');
		                	 var id=$(this).data('id');
		                	 var first = $(this).find('i');
		                	 if(first.hasClass('fa-heart')){
		                		 first.removeClass('fa-heart');
		                		 first.addClass('fa-heart-o');
		                		 carteleraScreen.clickHeart(3,id); //ya no me interesa
		                	 }else{
		                		 first.removeClass('fa-heart-o');
		                		 first.addClass('fa-heart');
		                		 carteleraScreen.clickHeart(1,id); //me interesa
		                	 }
		                 });
		                 if(carteleraScreen.eventosSubscreen.checkbox.prop('checked')){
		                	 carteleraScreen.eventosSubscreen.filtrar_corazon();
		                 }
	                 }
	             },
	             complete: function(){
	                 
	                 
	             }

	    	 });
		}
	},
	sugerenciasSubscreen : {
		sugerencias :$('#sugerencias_eventos'),
		get : function(){
			
		}
	},
	lugaresSubscreen : {
		lugares : $('#listado_lugares'),
		search : $('#search_lugares'),
		list: null, //'list_lugares'
		ul: $('#ul_lugares'),
		bindEvents : function(){
			this.search.on('input',function(){
				console.log('search change: '+$(this).val());
				if(carteleraScreen.lugaresSubscreen.list!==null){
					if($(this).val()===''){
						carteleraScreen.lugaresSubscreen.list.search();
					}else{
						carteleraScreen.lugaresSubscreen.list.search($(this).val(),['nombre_lugar','direccion_lugar']);
					}
					
				}
			});
		},
		_show: function(){
			carteleraScreen.lugaresSubscreen.lugares.show();
			carteleraScreen.eventosSubscreen.eventos.hide();
			carteleraScreen.lugaresSubscreen.get();
			
		},
		get : function(){
			console.log('entro get lugares');
			$.ajax({
	             url:app.url_ajax,
	             dataType: 'html',
	             data: {
	            	 accion: 'get_list_lugares',
	            	 user_email: user.correo,
	            	 user_pass: user.password
	             },
	             type: 'post',
	             timeout: 15000,
	             beforeSend: function(){
	            	 carteleraScreen.lugaresSubscreen.ul.html(app.loader_block);
	             },
	             error: function(a,b,c){
	                 console.log('error '+JSON.stringify(a)+JSON.stringify(b));
	                 carteleraScreen.lugaresSubscreen.ul.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
	             },
	             success: function(a){
	                 
	                 carteleraScreen.lugaresSubscreen.ul.html(a);
	                 if(carteleraScreen.lugaresSubscreen.ul.children().length>0){
		                 var options = {
		                	valueNames: ['nombre_lugar','direccion_lugar','horario_lugar','cover_lugar'
		                	             ]	 
		                 };
		                 carteleraScreen.lugaresSubscreen.list = new List('list_lugares',options);
		                 
	                 }
	             },
	             complete: function(){
	                 
	                 
	             }

	    	 });
		}
	}
};
var registerScreen = {
	registerPantalla : $('#register_screen'),
	registerForm : $('#registerForm'),
    registerButton : $('#registerButton'),
    pass1: $('#registerPass1'),
    pass2: $('#registerPass2'),
    success: false,
    loadScreenEvents: function(){
        $('#registerForm input[type="text"]').focusin(function(){
        	registerScreen.registerPantalla.find('.container').scrollTo(this);
        });
        registerScreen.registerForm.parsley().on('form:success',function(){
        	registerScreen.success = true;
        	registerScreen.registerButton.append(app.loader);
            registerScreen.registerButton.prop('disabled',true);
        	console.log('success form parsley');
        });
        registerScreen.registerForm.parsley().on('form:submit',function(){
            console.log('register');
            if(registerScreen.success){
            	registerScreen.success = false;
	            if(registerScreen.pass1.val()===registerScreen.pass2.val()){
	            	var formData = registerScreen.registerForm.getFormData();
	            	console.log(JSON.stringify(formData));
	            	formData.accion = 'register_user';
	                registerScreen.register(formData);
	        	}else{
	        		
	                myModal.open('Oops','Tus contrase&ntilde;as deben de ser las mismas');
	                
	                registerScreen.registerButton.prop('disabled',false);
	                registerScreen.registerButton.html('ENTRAR');
	        	}
            }
            return false;
        });
    },
    clean: function(){
    	$(':input','#registerForm')
    	  .not(':button, :submit, :reset, :hidden')
    	  .val('')
    	  .removeAttr('checked')
    	  .removeAttr('selected');
    },
    register : function(formDataRegister){
    	 $.ajax({
             url:app.url_ajax,
             dataType: 'json',
             data: formDataRegister,
             type: 'post',
             timeout: 15000,
            // processData : false,
            // contentType: false,
             error: function(a,b,c){
                 console.log('error '+JSON.stringify(a)+JSON.stringify(b));
             },
             success: function(a){
                 console.log(JSON.stringify(a));
                 
                 if(a.msj_error === undefined && a.success==='1'){
                     user.setProps(formDataRegister.user_email,formDataRegister.user_pass1,'false');
                     
                     registerScreen.registerPantalla.hide('slide',{direction:'left'},'fast');
                     registerScreen.clean();
    	 			 loginScreen.loginPantalla.hide();
    	 			 carteleraScreen.eventosSubscreen.get();
                     
                 }else{
                 	myModal.open('Error',a.msj_error);
                     

                 }
             },
             complete: function(){
            	 registerScreen.registerButton.prop('disabled',false);
	             registerScreen.registerButton.html('ENTRAR');
                 
             }

    	 });
    }
};
var loginScreen = {
    loginPantalla : $('#login_screen'),
    loginForm : $('#loginForm'),
    loginButton : $('#loginButton'),
    recordarPassword : $('#rememberPassword'),
    success:false,
    loadScreenEvents: function(){
    	$('#loginForm input[type="text"]').focusin(function(){
        	loginScreen.loginPantalla.find('.container2').scrollTo(this);
        });
        console.log('..loading login events');
        loginScreen.loginForm.parsley().on('form:success',function(){
            console.log('success form parsley');
            loginScreen.success = true;
            loginScreen.loginButton.append(app.loader);
            loginScreen.loginButton.prop('disabled',true);
           

        });
        console.log('...loading login submit event');
        loginScreen.loginForm.parsley().on('form:submit',function(){
            console.log('login submit');
            if(loginScreen.success){
            	loginScreen.success = false;
            	 formData = loginScreen.loginForm.getFormData();
                 formData.accion = 'login';
                 loginScreen.login(formData);
            }
            return false;
        });
    },
    login : function(formData){
        	
            $.ajax({
                url:app.url_ajax,
                dataType: 'json',
                data: formData,
                type: 'post',
                timeout: 15000,
                crossDomain: true,
                cache: false,
                //processData : false,
                //contentType: false,
                error: function(a,b,c){
                    console.log('error '+JSON.stringify(a)+JSON.stringify(b));
                    myModal.open('Error','Ha ocurrido un error, por favor intenta de nuevo');
                },
                success: function(a){
                    console.log(a);
                    
                    if(a.msj_error === undefined){
                        user.setProps(formData.user_email,formData.user_pass,(loginScreen.recordarPassword.prop('checked')+''));
                    	user.nombre = a.data.display_name;
                    	user.avatar = a.data.avatar;
                        loginScreen.loginPantalla.hide('slide',{direction:'left'},'fast');
                    	carteleraScreen.eventosSubscreen.get();
                    	app.showScreen(carteleraScreen.carteleraPantalla,1);
                        
                    }else{
                    	myModal.open('Error',a.msj_error);
                    }
                },
                complete: function(){
                    loginScreen.loginButton.html('ENTRAR');
                    loginScreen.loginButton.prop('disabled',false);
                    
                }

        });
    },
    skipLogin : function(){
        if(user.correo !=='' && user.password !==''){
            loginScreen.loginPantalla.hide();
            
        }
    }

};

var menuScreen = {
	menu: $('#menu_principal'),
};
var searchFriends = {
	pantalla: $('#buscaramigos_screen'),
	search: $('#search_friends'),
	ajax : null,
	ul: $('#list_search_friends'),
	search_friends: function(val){
		if(val=='' || val.length<3){return true;}
		
		if(searchFriends.ajax != null){
			searchFriends.ajax.abort();
			searchFriends.ajax = null;
		}
		searchFriends.ajax = $.ajax({
            url:app.url_ajax,
            dataType: 'html',
            data: {
            	accion: 'search_people',
            	user_email: user.correo,
           	 	user_pass: user.password,
           	 	s: val
            },
            type: 'post',
            timeout: 15000,
            error: function(a,b,c){
                console.log('error '+JSON.stringify(a)+JSON.stringify(b)); carteleraScreen.singleSubscreen.wrapper.html('<li style="text-align:center;">Ocurrio un error. Por favor intenta de nuevo</li>');
                
            },
            success: function(a){
           	    searchFriends.ul.html(a);
            },
            complete: function(){ 
            }
   	 });
	},
	_show: function(){
		menuScreen.menu.hide('slide',{direction:'left'},'fast');
		searchFriends.pantalla.show('slide',{direction:'right'},'fast');
	}
};
var app = {
    // Application Constructor
	footer_select_html: '<div style="position:absolute;top:0;"><div class="circulo"><i style="color:white!important;font-size:10px;" class="fa fa-circle" aria-hidden="true"></i></div></div>',
	
	footer : {
			perfil:  $('#footer-perfil'),
			cartelera: $('#footer-cartelera'),
			musica: $('#footer-musica'),
			promos: $('#footer-promos'),
			checkin: $('#footer-checkin')
		},
	current_screen: carteleraScreen.carteleraPantalla,
	current_footer: null,//app.footer.cartelera,
    url : 'http://rumba.clx.mobi/',
    url_ajax : 'http://rumba.clx.mobi/wp-admin/admin-ajax.php',
    loader_block: '<div style="display:block;margin:0 auto;width:40px;"><i class="fa fa-cog fa-spin" style="font-size:30px;font-color:black;"></i></div>',
    loader : '<div style="display:inline-block;margin:0 auto;width:40px;"><i class="fa fa-cog fa-spin" style="font-size:30px;font-color:black;"></i></div>',
    loader_mini : '<i class="fa fa-cog fa-spin" style="font-size:11px;font-color:black;"></i>',
    initialize: function() {
        
        //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //ifmovil
    	if(false){  
        	console.log('es movil');
        	document.addEventListener("deviceready", this.onDeviceReady, false);
        }else {
        	console.log('no es movil');
            app.onDeviceReady();
        }
    },
    loadEvents: function(){
    	$('.menu').click(function(){menuScreen.menu.show('slide',{direction:'left'});});
        app.current_footer 	 = app.footer.cartelera;
        searchFriends.search.on('input',function(){
        	console.log('search friends');
        	var val = $(this).val();
        	searchFriends.search_friends(val);
        });
    },	
    history: [],
    backButton: function(e){
    	if(app.history.length>0){
    		eval(app.history.pop());
    		console.log('backbutton');
        	e.preventDefault();
        	return false;
    	}
    	
    },
    onDeviceReady: function() {
        
        console.log('device ready');
        document.addEventListener("backbutton", app.backButton, false);
        loginScreen.loadScreenEvents();
        registerScreen.loadScreenEvents();
        proponerEventoScreen.bindEvents();
        proponerLugarScreen.bindEvents();
        carteleraScreen.eventosSubscreen.bindEvents();
        carteleraScreen.lugaresSubscreen.bindEvents();
        app.loadEvents();
        user.initialize();
    },
    showScreen: function(screenToShow,indexFooter){
    	console.log(app.current_screen);
    	console.log(screenToShow);
    	if(app.current_screen!=screenToShow){
    		console.log('entro primer if');
    		app.current_screen.hide();
    		app.current_footer.prev().remove();
    	
    	}
    	
    	switch(indexFooter){
    		case 0:
    			if(app.current_screen!=screenToShow){
    				app.current_screen = perfilScreen.perfilPantalla;
        			app.current_screen.show();
        			app.current_footer = app.footer.perfil;
        			app.current_footer.parent().prepend(app.footer_select_html);
    			}
    			
    			perfilScreen.get();
    			break;
    		case 1:
    			if(app.current_screen==screenToShow){
    				carteleraScreen.eventosSubscreen.get();
    			}else{
    				app.current_screen = carteleraScreen.carteleraPantalla;
        			app.current_screen.show();
        			
        			app.current_footer = app.footer.cartelera;
        			app.current_footer.parent().prepend(app.footer_select_html);
    			}
    			
    			break;
    		case 2:
    			if(app.current_screen!=screenToShow){
    				app.current_screen = promosScreen.promosPantalla;
        			app.current_screen.show();
        			app.current_footer = app.footer.promos;
        			app.current_footer.parent().prepend(app.footer_select_html);
    			}
    			promosScreen.get();
    			
    			break
    		case 3:
    			if(app.current_screen!=screenToShow){
    				app.current_screen = musicaScreen.musicaPantalla;
        			app.current_screen.show();
        			app.current_footer = app.footer.musica;
        			app.current_footer.parent().prepend(app.footer_select_html);
    			}
    			
    			break
    		case 4:
    			if(app.current_screen!=screenToShow){
    				app.current_screen = checkinScreen.checkinPantalla;
        			app.current_screen.show();
        			app.current_footer = app.footer.checkin;
        			app.current_footer.parent().prepend(app.footer_select_html);
    			}
    			
    			break;
    	}
    	app.current_screen = screenToShow;
    },
};

$.fn.scrollTo = function( target, options, callback ){
	  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
	  var settings = $.extend({
	    scrollTarget  : target,
	    offsetTop     : 50,
	    duration      : 500,
	    easing        : 'swing'
	  }, options);
	  return this.each(function(){
	    var scrollPane = $(this);
	    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
	    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
	    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
	      if (typeof callback == 'function') { callback.call(this); }
	    });
	  });
	}

$.fn.getFormData = function(){
	var thisForm = this;
	var data = {};
	$(thisForm).find('.inputpz').each(function(){
		var name = $(this).attr('name');
		if($(this).is('select')){
			eval("data."+name+" = $(this).val();");
		}else if($(this).is('input')){
			var type = $(this).attr('type');
			switch (type){
			case 'text':
				eval("data."+name+" = $(this).val();");
				break;
			case 'radio':
				var valor = $('input[name='+name+']:checked', thisForm).val();
				eval("data."+name+" ='"+valor+"';");
				break;
			case 'checkbox':
				var valor = $('input[name='+name+']:checked', thisForm).val();
				eval("data."+name+" ='"+valor+"';");
				break;
			case 'date':
				eval("data."+name+" = $(this).val();");
				break;
			case 'email':
				eval("data."+name+" = $(this).val();");
				break;
			case 'number':
				eval("data."+name+" = $(this).val();");
				break;
			case 'password':
				eval("data."+name+" = $(this).val();");
				break;
			
			case 'time':
				eval("data."+name+" = $(this).val();");
				break;
			}
		}else if($(this).is('textarea')){
			eval("data."+name+" = $(this).val();");
		}
		
	});
	return data;
}
app.initialize();
