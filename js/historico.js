const perfil = document.getElementById('perfil')
perfil.src = sessionStorage.getItem('fotoPerfil')
const main = document.getElementById('banhos')

const qtdBanho = document.getElementById('qtd')
const tempoMedia = document.getElementById('tempoMedia')
const chuvQtd = document.getElementById('chuveiroQtd')
const duchaQtd = document.getElementById('duchaQtd')
const consumoTotal = document.getElementById('consumoTotal')
const pontosTotal = document.getElementById('pontosTotal')

document.addEventListener('DOMContentLoaded', buscarHistorico())

const nomeUsuario = document.getElementById('nomeUsuario').innerText = sessionStorage.getItem('username')

async function buscarHistorico(){
    let data = new Date()

    const response = await fetch(`http://localhost:8080/api/banho/${sessionStorage.getItem('userId')}/${data.getMonth() + 1}/${data.getFullYear()}`).then((resposta) => {
        resposta.json().then((historicoJson) => {

            const dados = historicoJson[0]
            qtdBanho.innerText = dados.qtdBanho
            tempoMedia.innerText = dados.tempoMedia
            chuvQtd.innerText = dados.qtdChuveiro
            duchaQtd.innerText = dados.qtdDucha
            consumoTotal.innerText = dados.consumo.toFixed(2)
            pontosTotal.innerText = dados.pontos

            historicoJson[1].forEach(his => {

            const table = document.createElement('table')
            const thead = document.createElement('thead')
            const trhead = document.createElement('tr')
            const thData = document.createElement('th')
            const thTempo = document.createElement('th')
            const thTipo = document.createElement('th')
            const thVazao = document.createElement('th')
            const thConsumo = document.createElement('th')
            const thPontos = document.createElement('th')

            const tbody = document.createElement('tbody')
            const trbody = document.createElement('tr')
            const tdData = document.createElement('td')
            const tdTempo = document.createElement('td')
            const tdChuveiro = document.createElement('td')
            const tdVazao = document.createElement('td')
            const tdconsumo = document.createElement('td')
            const tdPontos = document.createElement('td')

            const infoData = new Date(his.data)
            tdData.id = 'data'
            tdData.innerText = `${infoData.getDate() + 1}/${infoData.getMonth() + 1}/${infoData.getFullYear()}`
            if(infoData.getMonth() + 1 < 10){
                tdData.innerText = `${infoData.getDate() + 1}/0${infoData.getMonth() + 1}/${infoData.getFullYear()}`
            }
            tdTempo.id = 'tempo'
            tdTempo.innerText = his.tempo
            tdChuveiro.id = 'chuveiro'
            tdChuveiro.innerText = his.tipoChuv
            tdVazao.id = 'vazao'
            tdVazao.innerText = his.vazaoChuv
            tdconsumo.id = 'consumo'
            tdconsumo.innerText = his.consumo.toFixed(2)
            tdPontos.id = 'pontos'
            tdPontos.innerText = his.pontos

            thData.innerText = 'Data'
            thTempo.innerText = 'Tempo'
            thTipo.innerText = 'Tipo de chuveiro'
            thVazao.innerText = 'Vazão'
            thConsumo.innerText = 'Consumo'
            thPontos.innerText = 'Pontos'

            trhead.appendChild(thData)
            trhead.appendChild(thTempo)
            trhead.appendChild(thTipo)
            trhead.appendChild(thVazao)
            trhead.appendChild(thConsumo)
            trhead.appendChild(thPontos)
            thead.appendChild(trhead)

            trbody.appendChild(tdData)
            trbody.appendChild(tdTempo)
            trbody.appendChild(tdChuveiro)
            trbody.appendChild(tdVazao)
            trbody.appendChild(tdconsumo)
            trbody.appendChild(tdPontos)
            tbody.appendChild(trbody)

            table.appendChild(thead)
            table.appendChild(tbody)
            const div = document.createElement('div')
            div.className = 'banhos'
            div.appendChild(table)
            main.appendChild(div)
            
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