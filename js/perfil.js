if(sessionStorage.getItem('token') == null){
    location.replace('http://127.0.0.1:5500/index.html')
}

const username = document.getElementById('nameUser')
const nomeCom = document.getElementById('nomeCom')
const dataNasc = document.getElementById('dataNasc')
const email = document.getElementById('email')
const bio = document.getElementById('bio')
const senha = document.getElementById('senha')
const divSenha = document.getElementById('divSenha')
const myFoto = document.getElementById('myFoto')
const imgPerfil = document.getElementById('imgPerfil')

const btAlterar = document.getElementById('disponibilizar')

const form = document.getElementById('card')

const alterar = document.getElementById('alterar')

window.addEventListener('DOMContentLoaded', buscaDados())

btAlterar.addEventListener('click', function () {
    disponibilizar()
})

imgPerfil.addEventListener('change', function() {
    if(imgPerfil.files.length > 0){
        const img = imgPerfil.files[0]
        const leitor = new FileReader()

        leitor.onload = async function(arqCarregado){
            const imgCovertida = arqCarregado.target.result

            document.getElementById('myFoto').src = imgCovertida
        }   
        leitor.readAsDataURL(img)
    }
})

btAlterar.addEventListener('click', disponibilizar)

alterar.addEventListener('click', alterarUser)


function disponibilizar() {
    username.removeAttribute('disabled')
    username.style.borderBottom = '2px solid #008000'

    nomeCom.removeAttribute('disabled')
    nomeCom.style.borderBottom = '2px solid #008000'

    dataNasc.removeAttribute('disabled')
    dataNasc.style.borderBottom = '2px solid #008000'

    email.removeAttribute('disabled')
    email.style.borderBottom = '2px solid #008000'

    bio.removeAttribute('disabled')

    divSenha.style.display = 'block'

    imgPerfil.style.display = 'block'

    btAlterar.style.display = 'none'
    alterar.style.display = 'inline'
}

function desabilitar() {
    username.setAttribute('disabled', true)
    username.style.border = 'none'

    nomeCom.setAttribute('disabled', true)
    nomeCom.style.border = 'none'

    dataNasc.setAttribute('disabled', true)
    dataNasc.style.border = 'none'

    email.setAttribute('disabled', true)
    email.style.border = 'none'

    bio.setAttribute('disabled', true)

    divSenha.style.display = 'none'

    imgPerfil.style.display = 'none'

    btAlterar.style.display = 'inline'
    alterar.style.display = 'none'
}


async function buscaDados() {
    await fetch(`http://localhost:8080/api/usuario/${sessionStorage.getItem('userId')}`)
        .then((response) => {
            response.json().then((resposta) => {
                username.value = resposta.userName
                nomeCom.value = resposta.nome
                dataNasc.value = resposta.dataNasc
                email.value = resposta.email
                bio.innerText = resposta.bio
                myFoto.src = resposta.foto
            })
        })
}

async function alterarUser() {

    const user = {
        id: sessionStorage.getItem('userId'),
        nome: nomeCom.value,
        dataNasc: dataNasc.value,
        email: email.value,
        bio: bio.value,
        userName: username.value,
        senha: senha.value,
        foto: myFoto.src
    }

    const PUT = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    await fetch(`http://localhost:8080/api/usuario/${user.id}`, PUT)
        .then((response) => {
            response.json().then((resposta) => {
                console.log(resposta)
                if (resposta.status == "OK") {
                    buscaDados()
                    desabilitar()

                    sessionStorage.setItem('username', user.userName)
                    sessionStorage.setItem('fotoPerfil', user.foto)

                    const sucesso = document.getElementById('sucesso')
                    sucesso.style.animation = 'notificar 10s'

                }else{
                    document.getElementById('msgErro').innerText = 'Não foi possível alterar seu perfil!'
                    document.getElementById('erro').style.display = 'flex'
                }
            })
        })
}

document.getElementById('close').addEventListener('click', function(){
    document.getElementById('erro').style.display = 'none'
})

