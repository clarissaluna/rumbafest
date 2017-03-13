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
	success:false,
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
           	 $('#privacidad_perfil').change(function(){
           		 var value = $(this).val();
           		 perfilScreen.update_privacidad(value);
           	 });
           	 $('#datos_perfil').click(function(){
           		 console.log('datos perfil click');
           		 $('.input_perfil_datos').attr('disabled',false);
           		 $('#div_botones_actualizar').show();
           	 });
           	 $('#cancelar_actualizar').click(function(){
           		 $('#div_botones_actualizar').hide();
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
	actualizar_datos(formData){
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
			comentariosScreen.comentarioInput.val('');
			console.log(comentario);
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
	            	 var html = '<li>'
	            			+'<div style="position:relative;">'
	            				+'<span class="avatar_comentarios" style="background-image:url('+user.avatar+');"></span>'
	            				+'<span class="nombre-comentario">'+user.nombre+'</span>'
	            				+'<span class="fecha-comentarios">Justo Ahora</span>'
	            				+'</div>'
	            			+'<div>'
	            				+'<p>'+comentario+'</p>'
	            			+'</div></li>';
	            	 comentariosScreen.ul.append(html);
	             },
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
	             },
	             complete: function(){
	                 
	                 
	             }

	    	 });
		}
};
var promosScreen = {
	promosPantalla: $('#promos_screen')
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
           	 proponerEventoScreen.clean();
           	 proponerEventoscreen.pantalla.hide();
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
	           	proponerLugarScreen.pantalla.hide();
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
	clickHeart: function(tipo, id_evento){
		var data = {
	            user_email: user.correo,
	            user_pass: user.password,
	            id_evento: id_evento
			};
		if(tipo===1){
			data.accion = 'me_interesa';
		}else if(tipo===2){
			data.accion = 'no_me_interesa'; //desde sugerencias
		}else if(tipo===3){
			data.accion = 'ya_no_interesa';
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
	                 $(".boton_interes_evento_single").click(function(){
	                	 console.log('click boton interes single');
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
	                 $('.comentar').click(function(){
	                	 comentariosScreen.id_evento = $(this).data('id');
	                	 comentariosScreen.get();
	                	 comentariosScreen.comentariosPantalla.show();
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
		                	 carteleraScreen.singleSubscreen.single.show();
		                	 carteleraScreen.singleSubscreen.get(id); 
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
        /*$('#registerForm input[type="text"]').focusin(function(){
        	console.log('focusin');
        	registerScreen.registerPantalla.find('.container-flex').scrollTo(this);
        	console.log(this);
        });*/
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
                     
                     registerScreen.registerPantalla.hide();
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
                        loginScreen.loginPantalla.hide();
                    	carteleraScreen.eventosSubscreen.get();
                        
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
    initialize: function() {
        
        //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //ifmovil
    	if(false){  
        	console.log('es movil');
        	document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
        	console.log('no es movil');
            app.onDeviceReady();
        }
    },
    loadEvents: function(){
    	$('.menu').click(function(){menuScreen.menu.show();});
        app.current_footer 	 = app.footer.cartelera;
        
    	
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
    			app.current_screen = perfilScreen.perfilPantalla;
    			app.current_screen.show();
    			app.current_footer = app.footer.perfil;
    			app.current_footer.parent().prepend(app.footer_select_html);
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
    			app.current_screen = promosScreen.promosPantalla;
    			app.current_screen.show();
    			app.current_footer = app.footer.promos;
    			app.current_footer.parent().prepend(app.footer_select_html);
    			break
    		case 3:
    			app.current_screen = musicaScreen.musicaPantalla;
    			app.current_screen.show();
    			app.current_footer = app.footer.musica;
    			app.current_footer.parent().prepend(app.footer_select_html);
    			break
    		case 4:
    			app.current_screen = checkinScreen.checkinPantalla;
    			app.current_screen.show();
    			app.current_footer = app.footer.checkin;
    			app.current_footer.parent().prepend(app.footer_select_html);
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
