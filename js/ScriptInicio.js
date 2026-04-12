$(function () {
   btnLogin = $('#btn-login').find('.login')[0];

   $(btnLogin).on('click', function () {
      sessionStorage.setItem('page', 'index.html')
   })

   $(window).ready(function () {
      if (window.location.hash.includes("access_token")) {

         const hash = window.location.hash.substring(1);
         const params = new URLSearchParams(hash);

         const accessToken = params.get("access_token");

         fetchUserInfo(accessToken);

         // Limpa a URL (remove token e params)

         if (accessToken) {
            window.history.replaceState({}, document.title, '/index.html');

            if (window.location.host.includes('github.io')) {
               window.history.replaceState({}, document.title, 'Primeiro-Projeto/index.html');
            }
         }


      } else {
         if (!sessionStorage.getItem('data')) {
            $(btnLogin).css('display', 'block')
         }
         else {
            data = JSON.parse(sessionStorage.getItem("data"))

            $(btnLogin).css('display', 'none')
            $('#btn-login').css('width', '100%')
            $('#btn-login').removeAttr('href')
            image = $('<div></div>').addClass('userImg').append($('<img>').attr('src', data.picture).attr('loading', 'lazy').attr('priority', 'high'));
            nome = $(`<p></p>`).addClass('textName').text(data.name);
            email = $(`<p></p>`).addClass('textEmail').text(data.email);
            btnExit = $('<button></button>').addClass('btnExit').text('sair')
            div=$('<div></div>').addClass('contNameEmail').append(nome, email)
            grup = $('<div></div>').addClass('userGrup').append(image,div)
            containerUser = $('<div></div>').addClass('container-User').append(grup, btnExit)
            $('#btn-login').append(containerUser);
            const userBtn=$(grup)
            
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
               $(userBtn).on('click', UserButton)

               function UserButton(btn) {
                   if ($(window).width()<=992) {
                  userBtn.width('70%')

                  $(userBtn).on('click', UserButton)

                     if($(btn.currentTarget).width() <= '94.797') {
                        $(btn.currentTarget).css({'width': '70%'});
                        $(btnExit).css({'opacity':'0'})

                     }else{
                        $(btn.currentTarget).css({'width': '12%'});
                        $(btnExit).css({'opacity':'1'});
                        }
                        
                        // setInterval(() => {
                        //    $(btn.currentTarget).css({'width': '95%','transition':'.7s ease-in'});
                        //    $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
                        // }, 8000); 
               }else{
                  userBtn.width('95%')
                  if($(btn.currentTarget).width() <= '36.75') {
                     $(btn.currentTarget).css({'width': '95%','transition':'.7s ease-in'});
                     $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
   
                  }else{
                     $(btn.currentTarget).css({'width': '12%','transition':'.7s ease-in'});
                      $(btnExit).css({'opacity':'1','transition':'opacity .7s ease-in'});
                     }
                     
                     setInterval(() => {
                        $(btn.currentTarget).css({'width': '95%','transition':'.7s ease-in'});
                        $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
                     }, 8000);     
                  }
               }
               
               $(window).on( "scroll", function(e) {    
                  if ($(e.currentTarget).scrollTop()>0) {
                     $('.userGrup').css({'width': '95%','transition':'.7s ease-in'});
                     $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
                  }
               })
         
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
      }

   })

   function fetchUserInfo(accessToken) {

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
               $('#btn-login').removeAttr('href')
               image = $('<div></div>').addClass('userImg').append($('<img>').attr('src', data.picture).attr('loading', 'lazy').attr('priority', 'high'));
               nome = $(`<p></p>`).addClass('textName').text(data.name);
               email = $(`<p></p>`).addClass('textEmail').text(data.email);
               btnExit = $('<button></button>').addClass('btnExit').text('sair')
               div=$('<div></div>').addClass('contNameEmail').append(nome, email)
               grup = $('<div></div>').addClass('userGrup').append(image,div)
               containerUser = $('<div></div>').addClass('container-User').append(grup, btnExit)
               $('#btn-login').append(containerUser)
               const userBtn=$(grup)
         
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
             
               $(userBtn).on('click', UserButton)

                function UserButton(btn) {

               if ($(window).width()<=992) {
                  userBtn.width('70%')

                  $(userBtn).on('click', UserButton)

                     if($(btn.currentTarget).width() <= '94.797') {
                        $(btn.currentTarget).css({'width': '70%'});
                        $(btnExit).css({'opacity':'0'})

                     }else{
                        $(btn.currentTarget).css({'width': '12%'});
                        $(btnExit).css({'opacity':'1'});
                        }
                        
                        // setInterval(() => {
                        //    $(btn.currentTarget).css({'width': '95%','transition':'.7s ease-in'});
                        //    $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
                        // }, 8000); 
               }else{
                  userBtn.width('95%')
                  
                  if($(btn.currentTarget).width() <= '36.75') {
                     $(btn.currentTarget).css({'width': '95%','transition':'.7s ease-in'});
                     $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
   
                  }else{
                     $(btn.currentTarget).css({'width': '12%','transition':'.7s ease-in'});
                      $(btnExit).css({'opacity':'1','transition':'opacity .7s ease-in'});
                     }
                     
                     setInterval(() => {
                        $(btn.currentTarget).css({'width': '95%','transition':'.7s ease-in'});
                        $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
                     }, 8000);     
                  }
               }
               
               $(window).on( "scroll", function(e) {    
                  if ($(e.currentTarget).scrollTop()>0) {
                     $('.userGrup').css({'width': '95%','transition':'.7s ease-in'});
                     $(btnExit).css({'opacity':'0','transition':'opacity .7s ease-in'})
                  }
               })
            }
            
         },
         error: function (error) {
            alert('Erro:', error);
         }
      });
   }
})
$.getJSON('js/ApiProduts.json', function (arrayProdutos) {

   arrayProdutos.map((produts, i) => {
      objCard = $('<div></div>').addClass('produto--item');
      img = $('<div></div>').addClass('produto--img').append($('<img>').attr('src', produts.image));
      p = $(`<p></p>`).attr('title', produts.name).text(produts.name);
      button = $('<button></button>').addClass('btn-card').attr('data-indice', i).text('Detalhes')
      $('.produtos--items').append(objCard.append(img, p, button));

      btnCard = objCard.children('.btn-card')[0];
      userBtn=$('.container-User > .userGrup')[0]

      $(btnCard).each((i, obj) => {
         $(obj).click(() => {
            sessionStorage.setItem('produts', JSON.stringify(produts));
            if (location.protocol == 'https:') {

               if (window.location.host.includes('.app')) {
                  window.location.href = location.protocol + '//' + location.host + '/pedidos.html';
               } else {
                  window.location.href = location.protocol + '//' + location.host + '/Primeiro-Projeto/' + 'pedidos.html';
               }


            } else if (location.protocol == 'http:') {

               window.location.href = location.protocol + '//' + location.host + '/pedidos.html';

            }
         })
      });
   })

   $('.produtos--items').slick({
      dots: false,
      infinite: false,
      speed: 1300,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               infinite: false,
               speed: 800,
               dots: false,
               arrows: true,
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               infinite: false,
               speed: 800,
               slidesToScroll: 1,
               arrows: true,
            }
         }
      ]
   });
   sideBar = $(".sidebar");
   nameLogo = $('.logo--name');
   menu = $('.menu-btn .line');

   correntSlider = 0;

   $('.button-prop').on('click', mobileEvent)

   function mobileEvent() {
      $('.menu-btn').toggleClass('btn-active');
      $('.nav--menu').toggleClass('mobile-btn');

      !$('.nav--menu').hasClass('mobile-btn') && $('body').width() < 992 ? $('body').css('overflow', 'hidden') : $('body').css('overflow', 'visible');

      if ($('.menu-btn').hasClass('btn-active')) {
         sideBar.css('background-color', '#141414')
         nameLogo.css('color', '#fff');
         menu.css('background-color', '#fff');
      } else {
         if (window.scrollY == 0) {
            sideBar.css('background', 'transparent')
         } else {
            sideBar.css('background', '#e9e8e8f8')
            nameLogo.css('color', '#000');
            menu.css('background-color', '#000');
         }
      }
   }



   function showSlider() {
      totalSlider = $(".slider--item");

      max = totalSlider.length;

      $(totalSlider[correntSlider]).css('opacity', '0');

      correntSlider++

      $(totalSlider[correntSlider]).css('opacity', '.5');

      if (correntSlider >= max) {
         correntSlider = 0;
         $(totalSlider[correntSlider]).css('opacity', '.5');
      }
   }

   $(window).scroll((elem) => {
      let pos = $(elem.currentTarget).scrollTop();
      pos ? sideBar.addClass('styleSidebar') : sideBar.removeClass('styleSidebar');

      sect = $(elem.currentTarget).scrollTop();

      sectionHeight = $('section').height()

      if (sect > 0) {
         sideBar.removeClass('styleSidebar');
         sideBar.css('background-color', '#e9e8e8f8')
         nameLogo.css('color', '#000');
         menu.css('background-color', '#000');

      } else {
         sideBar.addClass('styleSidebar');
         sideBar.css('background', 'transparent')

         nameLogo.css('color', '#fff')
         menu.css('background-color', '#fff')
      }

      $('section').each(function () {
         let target = $(this).offset().top;
         let id = $(this).attr('id');

         if (sect > target - sectionHeight) {
            $('.nav--menu > a').removeClass('active');
            $('.nav--menu > a[href=\\#' + id + ']').addClass('active');
         }
      });

   })

   $('.menu--secao').each(function (i, section) {
      $(section).click((e) => {
         if (e.type == 'click') {
            mobileEvent()
         };
      })
   })

   setInterval(showSlider, 15000);
})








