const email = document.getElementById('email')
const senha = document.getElementById('senha')
const btEntrar = document.getElementById('entrar')
const form = document.getElementById('form')
const close = document.getElementById('close')
const erro = document.getElementById('erro')


form.addEventListener('submit', function (evt) {
    evt.preventDefault()
    logar()
})


async function logar() {
    if (email.value != "" && senha.value != "") {
        const user = {
            email: email.value,
            senha: senha.value
        }

        const POST = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }

        await fetch(`http://localhost:8080/api/usuario/login`, POST)
            .then((response) => {
                response.json().then((resposta) => {

                    if (resposta.hasOwnProperty('mensagem') == false) {
                        sessionStorage.setItem('token', resposta[0].token)
                        sessionStorage.setItem('userId', resposta[1])
                        sessionStorage.setItem('username', resposta[2])
                        sessionStorage.setItem('fotoPerfil', resposta[3])

                        location.replace('http://127.0.0.1:5500/telas/foruns.html')
                    }else{
                        document.getElementById('msgErro').innerText = resposta.mensagem
                        erro.style.display = 'flex'
                    }
                })
            })
    }
}

close.addEventListener('click', function(){
    erro.style.display = 'none'
})