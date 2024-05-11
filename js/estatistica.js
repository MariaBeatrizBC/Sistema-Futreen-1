const username = document.getElementById('username')
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
    
    const response = await fetch(`http://localhost:8080/api/banho/${sessionStorage.getItem('userId')}/03/2004`).then((resposta) => {
        resposta.json().then((estatistica) => {

            console.log(estatistica)
            qtdBanho.innerText = estatistica[0].qtdBanho
            pontos.innerText = estatistica[0].pontos
            tempoTotal.innerText = estatistica[0].tempoTotal
            consumo.innerText = estatistica[0].consumo 
            timeMedia.innerText = estatistica[0].tempoMedia

            bio.innerText = estatistica[0].bio
            qtdBanhoTotal.innerText = estatistica[0].qtdBanhoTotal
            pontosTotal.innerText = estatistica[0].pontuacaoTotal
            consumoTotal.innerText = estatistica[0].consumoTotal
            consumoBanho.innerText = estatistica[0].consumoBanho

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

