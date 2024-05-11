const tabela = document.getElementById('tabela')
const tbody = document.getElementById('tbody')
let cont = 1

if(sessionStorage.getItem('token') == null){
    location.replace('http://127.0.0.1:5500/index.html')
}

const nomeUser = document.getElementById('nomeUsuario')
nomeUser.innerText = sessionStorage.getItem("username")

const perfil = document.getElementById('perfil')
perfil.src = sessionStorage.getItem('fotoPerfil')

const fotoConv = document.getElementById('imgPerfilConv')

document.addEventListener('DOMContentLoaded', buscaRanking())

async function buscaRanking(){
    const response = await fetch('http://localhost:8080/api/banho/ranking').then((resposta) => {
        resposta.json().then((ranking) => {
            console.log(ranking)
            ranking.forEach(banho => {
                const tr = document.createElement('tr')
                const tdPosicao = document.createElement('td')
                tdPosicao.innerText = cont

                const tdUsername = document.createElement('td')
                
                const img = document.createElement('img')
                img.src = banho.usuario.foto
                img.className = 'imgPerfil'
                tdUsername.append(img, banho.usuario.userName)
                

                const tdPontos = document.createElement('td')
                tdPontos.innerText = banho.pontos

                tr.appendChild(tdPosicao)
                tr.appendChild(tdUsername)
                tr.appendChild(tdPontos)

                tbody.appendChild(tr)
                cont++

            });
        })
    })
}

function clickMenu(){
    if(itens.style.display == 'block') {
        itens.style.display = 'none';
    } else {
        itens.style.display = 'block';
    }
} 