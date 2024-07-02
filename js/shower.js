if(sessionStorage.getItem('token') == null){
  location.replace('http://127.0.0.1:5500/index.html')
}

const nomeUser = document.getElementById('nomeUsuario')
nomeUser.innerText = sessionStorage.getItem("username")

const perfil = document.getElementById('perfil')
perfil.src = sessionStorage.getItem('fotoPerfil')

const fotoConv = document.getElementById('imgPerfilConv')

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;



function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`;
}
if (sessionStorage.getItem('token') == null) {
    location.replace('http://127.0.0.1:5500/index.html');
}

function clickMenu(){
    if(itens.style.display == 'block') {
        itens.style.display = 'none';
    } else {
        itens.style.display = 'block';
    }
} 

document.getElementById('stop').addEventListener('click', registrar)

async function registrar(){
  pause()

  const hora = document.getElementById('hour').innerText
  const minutos = document.getElementById('minute').innerText
  const segundos = document.getElementById('second').innerText

  const banho = {
    data: Date.now(),
    usuario: {
      id: sessionStorage.getItem('userId')
    },
    tempo: `${hora}:${minutos}:${segundos}`,
    tipoChuv: document.getElementById('tipoChuv').value,
    vazaoChuv: document.getElementById('vazao').value
  }

  const post = {
    method: 'POST',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(banho)
  }
  
  const sucesso = document.getElementById('sucesso')

  await fetch('http://localhost:8080/api/banho', post).then((response) => {
    response.json().then((resposta) =>{
      console.log(resposta)

      if(resposta.status == 'OK'){
        document.getElementById('ponto').innerText = resposta.mensagem
        sucesso.style.display = 'block'
        sucesso.style.animation = 'notificar 10s'
      } else{
        document.getElementById('msgErro').innerText = 'Não foi possível registrar se banho!'
        document.getElementById('erro').style.display = 'flex'
      }
    })

    sucesso.addEventListener('animationend', function(){
      sucesso.style.display = 'none'
      window.location.reload()
    })
  })

}

document.getElementById('close').addEventListener('click', function(){
  document.getElementById('erro').style.display = 'none'
})