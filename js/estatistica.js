const perfil = document.getElementById('perfil')
perfil.src = sessionStorage.getItem('fotoPerfil')
const username = document.getElementById('nomeUsuario')
const bio = document.getElementById('bio')
const qtdBanho = document.getElementById('qtdBanho')
const pontos = document.getElementById('pontos')
const tempoTotal = document.getElementById('tempoTotal')
const timeMedia = document.getElementById('tempoMedia')
const consumo = document.getElementById('consumo')

const qtdBanhoTotal = document.getElementById('qtdBanhoTotal')
const pontosTotal = document.getElementById('pontosTotal')
const consumoTotal = document.getElementById('consumoTotal')
const consumoBanho = document.getElementById('consumoBanho')

const grafico = document.getElementById('grafico')

username.innerText = sessionStorage.getItem('username')



document.addEventListener("DOMContentLoaded", buscarDados())

async function buscarDados(){
    let data = new Date()  

    const response = await fetch(`http://localhost:8080/api/banho/${sessionStorage.getItem('userId')}/${data.getMonth() + 1}/${data.getFullYear()}`).then((resposta) => {
        resposta.json().then((estatistica) => {

            console.log(estatistica)
            qtdBanho.innerText = estatistica[0].qtdBanho
            pontos.innerText = estatistica[0].pontos
            tempoTotal.innerText = estatistica[0].tempoTotal
            consumo.innerText = estatistica[0].consumo.toFixed(2) 
            timeMedia.innerText = estatistica[0].tempoMedia

            qtdBanhoTotal.innerText = estatistica[0].qtdBanhoTotal
            pontosTotal.innerText = estatistica[0].pontuacaoTotal
            consumoTotal.innerText = estatistica[0].consumoTotal.toFixed(2)
            consumoBanho.innerText = estatistica[0].consumoBanho.toFixed(2)

            new Chart(grafico, {
                type: 'bar',
                data: {
                  labels: ['Litos de Água'],
                  datasets: [{
                    label: 'Consumo de Água no Mês',
                    data: [estatistica[0].consumo],
                    borderWidth: 1,
                    backgroundColor: '#008000',
                    maxBarThickness: 100
                  },
                {
                    label: 'Consumo Ideal de Água',
                    data: [estatistica[0].esperado],
                    borderWidth: 1,
                    backgroundColor: '#8BC02B',
                    maxBarThickness: 100
                }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });

        })
    })
}

document.getElementById('logo').addEventListener('click', function(){
  sessionStorage.clear()
})

function clickMenu(){
  if(itens.style.display == 'block') {
      itens.style.display = 'none';
  } else {
      itens.style.display = 'block';
  }
} 

