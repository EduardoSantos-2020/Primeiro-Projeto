  
const destino = sessionStorage.getItem('page', window.location.href)
const Title = document.querySelector(".titulo-login")
const linkTitle = document.getElementById('imgLink')
const btnGoogle = document.getElementById("btn-entrar-google");
const btnBack = document.getElementById('btn-Back')
const btnCreate = document.getElementById('btn-create')
const btnEnter = document.getElementById('btn-entrar');
const btnRecovery = document.getElementById('recovery')
const InputName = document.getElementById('Name')
const InputEmail = document.getElementById('Email')
const InputPassword = document.getElementById('password')
const LabelPassword = document.querySelector('.namePassword')
const btnCreateUser = document.querySelector('.btn-cadastrar')
const btnCancelRecovery = document.getElementById('btn-cancel-recovery')
const containerCadastro = document.querySelector('.containerMenu');
const link = document.querySelector('#link')
const linkSenha = document.querySelector('.linkSenha')
const fileImg = document.querySelector('#upFile')
const nome = document.getElementById('Name')
const email = document.getElementById('Email')
const authEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const imgPhoto = document.getElementById('Photo')

urlVerified = '';

if (!containerCadastro.classList.contains('recovery') || !containerCadastro.classList.contains('cadastrar') && window.location.reload) {
  location.hash = 'login';
}
window.addEventListener('load',genereLinkPage)

window.addEventListener("hashchange", redirectUrlPages)

btnEnter.addEventListener('click', btnEnterConfirm)

btnCancelRecovery.addEventListener('click',removeCadastro)

btnGoogle.addEventListener('click', btnGoogleConfirm)

btnCreateUser.addEventListener('click', function () {
  link.setAttribute('href', '#registrar-se')
})
// btnRecovery.addEventListener('click', function () {
  // ink.setAttribute('href', '#password') // não precisa esta no html
// })

fileImg.addEventListener('change', (item) => {
  
    let file = item.target.files[0];
  
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        imgPhoto.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
})
  
function redirectUrlPages(){
    if (this.location.hash == '#login') {
    loginFunction()
  }
  else if (this.location.hash == '#registrar-se') {
    registerFunction()
  }
  else if (this.location.hash == '#password') {
    recoveryPassFunction()
  }
    
}

function recoveryFunction() {
  containerCadastro.classList.add('recovery')
  btnCreate.classList.remove('btn-cadastrar')
  btnCreate.classList.add('btn-confirmar')
  LabelPassword.innerHTML = 'Confirme o codigo'
  InputEmail.placeholder = 'Digite seu e-mail cadastrado'
  btnRecovery.style.display = 'none'
  InputPassword.placeholder = 'Digite  o codigo'
  Title.innerHTML = 'Esqueceu a sua senha'
  btnEnter.innerHTML = 'Enviar código'
  btnCreate.innerHTML = 'Confirmar código'
  btnCancelRecovery.style.display = 'block'
  btnGoogle.style.display = 'none'
}

function registerFunction() {

  containerCadastro.classList.add('cadastrar');
  btnCreate.classList.add('btn-cadastrar')
  btnCreate.classList.remove('btn-confirmar')

  Title.innerHTML = 'Criar sua conta'
  //InputName.focus()
  btnEnter.innerHTML = 'Confirmar' //botao enter
  btnCreate.style.display = 'none' //botao criar conta
  btnCancelRecovery.style.display = 'block'//botao cancelar
  btnRecovery.style.display = 'none'//botao esqueceu a senha
  btnGoogle.style.display = 'flex' //botao Google

  link.setAttribute('href', '#registrar-se')
}

function recoveryPassFunction() {
  link.setAttribute('href', '#password')
  containerCadastro.classList.add('recovery');
  btnCreate.classList.remove('btn-cadastrar');
  btnCreate.classList.add('btn-confirmar');
  LabelPassword.innerHTML = 'Confirme o codigo';
  InputEmail.placeholder = 'Digite seu e-mail cadastrado';
  // InputEmail.focus();
  btnRecovery.style.display = 'none';
  InputPassword.placeholder = 'Digite  o codigo';
  InputPassword.setAttribute('type', 'number');
  Title.innerHTML = 'Esqueceu a sua senha ?';
  btnEnter.innerHTML = 'Enviar código';
  btnCreate.innerHTML = 'Confirmar código';
  btnCancelRecovery.style.display = 'block';
  btnGoogle.style.display = 'none';
  btnConfirmRecoveryPass();
}

function loginFunction() {
  containerCadastro.classList.remove('cadastrar')
  containerCadastro.classList.remove('recovery')
  btnCreate.classList.remove('btn-confirmar')
  btnCreate.classList.add('btn-cadastrar')
  Title.innerHTML = 'Fazer login infortec'
  btnEnter.innerHTML = 'Entrar'
  btnCreate.innerHTML = 'Criar Conta';
  btnGoogle.style.display = 'flex';
  btnRecovery.style.display = 'block';
  btnCreate.style.display = 'block'
  LabelPassword.innerHTML = 'Senha';
  InputEmail.placeholder = 'Digite seu Email';
  //InputEmail.focus()
  InputPassword.placeholder = "Digite sua Senha";
  InputPassword.setAttribute('type', 'password')
  btnCancelRecovery.style.display = 'none'
  link.setAttribute('href', '#login')
}

function removeCadastro() {
  containerCadastro.classList.remove('cadastrar')
  containerCadastro.classList.remove('recovery')
  btnRecovery.style.display = 'block'
  btnCancelRecovery.style.display = 'none'
  btnCreate.style.display = 'block'
  btnCreate.classList.remove('btn-confirmar')
  btnCreate.classList.add('btn-cadastrar')
  link.setAttribute('href', '#login')
}

function btnConfirmRecoveryPass() {

  const btnConfirmCode = document.querySelector('.btn-confirmar')
  btnConfirmCode.addEventListener('click', function () {

    if (containerCadastro.classList.contains('recovery')) {
      link.setAttribute('href', '#login')
    }
  })
}

function btnEnterConfirm() {

  sessionStorage.setItem('data', JSON.stringify({ 'name': nome.value, 'email': email.value, 'picture': imgPhoto.src }))


    if (location.protocol == 'https:') {

    if (window.location.host.includes('.app')) {
      window.location.href = location.protocol + '//' + location.host +'/' + destino;
    } else {
      window.location.href = location.protocol + '//' + location.host + '/Primeiro-Projeto/' + destino;
    }

  } else if (location.protocol == 'http:') {
    window.location.href = location.protocol + '//' + location.host + '/' + destino;
  }

}

function genereLinkPage(){
  if (location.protocol == 'https:') {
  
    if (window.location.host.includes('.app')) {
      
      urlVerified = `${location.protocol + '//' + location.host + '/' + destino}`;
    
      linkTitle.setAttribute('href', location.protocol + '//' + location.host + '/'+ destino);
      
    } else if (window.location.host.includes('github.io')) {
      
      urlVerified = `${location.protocol + '//' + location.host + '/Primeiro-Projeto/' + destino}`;
      
      linkTitle.setAttribute('href', location.protocol + '//' + location.host + '/Primeiro-Projeto/' + '/'+ destino)
    }
  
  } else if (location.protocol == 'http:') {
    urlVerified = `${location.protocol + '//' + location.host + '/' + destino}`;
    linkTitle.setAttribute('href', location.protocol + '//' + location.host + '/'+destino)
  }
}

function btnGoogleConfirm () {
// const state = encodeURIComponent(urlVerified);

// Caso for ver no Mobile  mude a URL redirect_uri;

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=112123801593-t7p4obmhr3qpgsss44qsrlioqsht149q.apps.googleusercontent.com&` +
    `redirect_uri=${urlVerified}&` +
    `response_type=token&` +
    `scope=openid%20email%20profile&` +
    `prompt=consent&`;
//`state=?`;

  window.location.href = authUrl;

// window.location.hash = state;
}





  















