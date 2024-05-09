let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => start();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

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
  return input > 10 ? input : `0${input}`;
}
if (sessionStorage.getItem('token') == null) {
    location.replace('http://127.0.0.1:5500/index.html');
}

const lupa = document.getElementById('lupa');

const body = document.getElementById('formForum');
if (body == null) {
    const campName = document.getElementById('nomeUsuario');
    campName.innerText = sessionStorage.getItem("username");

    const perfil = document.getElementById('perfil');
    perfil.src = sessionStorage.getItem('fotoPerfil');

    window.addEventListener('DOMContentLoaded', listar);

    lupa.addEventListener('click', pesquisarForum);
} else {
    const btCriar = document.getElementById('btCriarForum');
    const imgPerfil = document.getElementById('imgPerfil');

    imgPerfil.addEventListener('change', function() {
        if(imgPerfil.files.length > 0){
            const img = imgPerfil.files[0];
            const leitor = new FileReader();
    
            leitor.onload = async function(arqCarregado){
                const imgCovertida = arqCarregado.target.result;
    
                document.getElementById('imgForum').src = imgCovertida;
    
                console.log(imgCovertida);
            }   
            leitor.readAsDataURL(img);
        }
    })

    btCriar.addEventListener('click', cadastrar);
}

function clickMenu(){
    if(itens.style.display == 'block') {
        itens.style.display = 'none';
    } else {
        itens.style.display = 'block';
    }
} 