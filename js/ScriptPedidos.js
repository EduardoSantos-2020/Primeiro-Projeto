$(window).ready(() => {

   menu = $('.menu-btn .line');
   sideBar = $(".sidebar");
   nameLogo = $('.logo--name');

   $('.button-prop').on('click', mobileEvent)

   function mobileEvent() {
      $('.menu-btn').toggleClass('btn-active');
      $('.containerbuttons').toggleClass('mobile-btn');

      !$('.containerbuttons').hasClass('mobile-btn') && $('body').width() < 992 ? $('body').css('overflow', 'hidden') : $('body').css('overflow', 'visible');


      if ($('.menu-btn').hasClass('btn-active')) {
         sideBar.css('background-color', '#141414')
         nameLogo.css('color', '#fff');
         menu.css('background-color', '#fff');
      } else {

         sideBar.css('background', '#e9e8e8f8')
         nameLogo.css('color', '#000');
         menu.css('background-color', '#000');

      }

   }

   let btnLogin = $('#btn-login').find('.login')[0];

   if (window.location.hash.includes("access_token")) {

      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      fetchUserInfo(accessToken);

   } else {

      if (!sessionStorage.getItem('data')) {
         $(btnLogin).css('display', 'block');

      } else {

         data = JSON.parse(sessionStorage.getItem("data"))

         $(btnLogin).css('display', 'none')
         $('#btn-login').css('width', '100%')
         $('#btn-login').removeAttr('href')
         image = $('<div></div>').addClass('userImg').append($('<img>').attr('src', data.picture).attr('loading', 'lazy').attr('priority', 'high'));
         nome = $(`<p></p>`).addClass('textName').text(data.name);
         email = $(`<p></p>`).addClass('textEmail').text(data.email);
         btnExit = $('<button></button>').addClass('btnExit').text('sair')
         grup = $('<div></div>').addClass('userGrup').append(image, nome)
         containerUser = $('<div></div>').addClass('container-User').append(grup, email, btnExit)
         $('#btn-login').append(containerUser)

         btnExit[0].addEventListener('click', function () {
            sessionStorage.removeItem('access_token')
            sessionStorage.removeItem("data");
            sessionStorage.removeItem("page");
            $('#btn-login').css('width', '0');

            if (location.protocol == 'https:') {


               if (location.protocol == 'https:') {

                  if (window.location.host.includes('.app')) {

                     window.location.href = '/index.html';

                  } else if (window.location.host.includes('github.io')) {

                     window.location.href = '/Primeiro-Projeto/' + 'index.html';
                  }
               }

            } else if (location.protocol == 'http:') {
               window.location.href = '/index.html';
            }
         })
      }
   }

   function fetchUserInfo(accessToken) {
      // Limpa a URL (remove token e params)
      if (accessToken) {
         if (location.protocol == 'https:') {

            if (window.location.host.includes('.app')) {
               window.history.replaceState({}, document.title, '/pedidos.html');
            } else {
               window.history.replaceState({}, document.title, '/Primeiro-Projeto/pedidos.html');
            }
         }

         if (location.protocol == 'http:') {
            window.history.replaceState({}, document.title, 'pedidos.html');
         }

      }


      $.ajax({
         url: "https://www.googleapis.com/oauth2/v3/userinfo",
         type: 'GET',
         headers: {
            'Authorization': `Bearer ${accessToken}`
         },
         success: function (response) {

            sessionStorage.setItem("data", JSON.stringify(response));
            const data = JSON.parse(sessionStorage.getItem("data"));

            if (sessionStorage.getItem('data')) {
               $('#btn-login').css('width', '100%')
               $(btnLogin).css('display', 'none')
               $('#btn-login').removeAttr('href')
               image = $('<div></div>').addClass('userImg').append($('<img>').attr('src', data.picture).attr('loading', 'lazy').attr('priority', 'high'));
               nome = $(`<p></p>`).text(data.name);
               email = $(`<p></p>`).addClass('textEmail').text(data.email);
               btnExit = $('<button></button>').addClass('btnExit').text('sair')
               grup = $('<div></div>').addClass('userGrup').append(image, nome)
               containerUser = $('<div></div>').addClass('container-User').append(grup, email, btnExit)
               $('#btn-login').append(containerUser)

               btnExit[0].addEventListener('click', function () {
                  sessionStorage.removeItem('access_token')
                  sessionStorage.removeItem("data");
                  sessionStorage.removeItem("page");
                  $('#btn-login').css('width', '0')

                  if (location.protocol == 'https:') {

                     if (window.location.host.includes('.app')) {
                        window.location.href = '/index.html';
                     } else {
                        window.location.href = '/Primeiro-Projeto/' + 'index.html';
                     }

                  } else if (location.protocol == 'http:') {

                     window.location.href = '/index.html';

                  }
               })
            }
         },
         error: function (error) {
            console.log('Erro:', error);
         }
      });
   }

   $('#btn-Back').click(() => {

      if (location.protocol == 'https:') {

         if (window.location.host.includes('.app')) {
            window.location.href = location.protocol + '//' + location.host + '/index.html';
         } else {
            window.location.href = location.protocol + '//' + location.host + '/Primeiro-Projeto/' + 'index.html';
         }

      }

      if (location.protocol == 'http:') {
         window.location.href = location.protocol + '//' + location.host + '/index.html';
      }
   })

   const dados = JSON.parse(sessionStorage.getItem("data"));
   btnLogin = $('#btn-login').find('.login')[0]
   btnLogin.addEventListener('click', function () {
      sessionStorage.setItem('page', 'pedidos.html')
   })

   objetoStr = sessionStorage.getItem('produts')
   objeto = JSON.parse(objetoStr)

   let imgSrc = $('.img--produto');
   let titleProd = $('.title--produto');
   let caracterProd = $('.campo--caracteristicas');
   let desProd = $('.campo--descricao');
   let precoProd = $('.preco-produto');

   $(objeto).map((i, obj) => {

      $('title').html(obj.name);
      $(precoProd).html('R$:' + obj.price);
      $(titleProd).html(obj.name);
      $(imgSrc).attr('src', obj.image);

      $(obj.descricao).map((i, event) => {

         let Texto1 = obj.caracteristics[i].p;
         let Texto2 = obj.descricao[i].p;

         let caract = $('<p></p>').addClass('caracter--produto')
         $(caracterProd).append(caract.text(Texto1));

         let descri = $('<p></p>').addClass('descricao--produto')
         $(desProd).append(descri.html(Texto2))
      })
   })
})
