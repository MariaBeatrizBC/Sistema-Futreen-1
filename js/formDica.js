if(sessionStorage.getItem('token') == null){
    location.replace('http://127.0.0.1:5500/index.html')
}

const titulo = document.getElementById('titulo')
const material = document.getElementById('material')
const tutorial = document.getElementById('tutorial')
const botao = document.getElementById('btForm')
const foto = document.getElementById('foto')
const cpId = document.getElementById('cpId')
let img64 = null

foto.addEventListener('change', function() {
    if(foto.files.length > 0){
        let img = foto.files[0]
        const leitor = new FileReader()

        leitor.onload = async function(arqCarregado){
            img64 = arqCarregado.target.result

        }
        leitor.readAsDataURL(img)
    }
})

document.addEventListener('DOMContentLoaded', async function(){
    if(sessionStorage.getItem('dicaId') != null){
        await fetch(`http://localhost:8080/api/dica/${sessionStorage.getItem('dicaId')}`).then((response) => {
        response.json().then((dica) => {
            console.log(dica)
            titulo.value = dica.titulo
            material.value = dica.material
            tutorial.value = dica.tutorial
            cpId.value = dica.id
            botao.innerText = 'Alterar'
        })
        })
    }
})

botao.addEventListener('click', function(event){
    event.preventDefault()
    if(cpId.value != ''){
        alterar()
    }else{
        registrar()
    }

})

async function registrar(){
    event.preventDefault()

    const dica = {
        material: material.value,
        tutorial: tutorial.value,
        autor: {
            id: sessionStorage.getItem('userId')
        },
        titulo: titulo.value,
        foto: img64
    }

    const post = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(dica)
    }

    console.log(dica)

    await fetch(`http://localhost:8080/api/dica`, post).then((response) => {
        response.json().then((resposta) => {

            if(resposta.status == 'OK'){
                document.getElementById('sucessoPost').style.display = 'block'
                titulo.value = ''
                material.value = ''
                tutorial.value = ''
                setTimeout(function(){window.location.href = 'dicas.html';}, 3000)
            }else{
                document.getElementById('msgErro').innerText = 'Não foi possível cadastrar seu Dica Sustentável!'
                document.getElementById('erro').style.display = 'flex'
            }
        })
    })
}

async function alterar(){

    const dica = {
        id: cpId.value,
        material: material.value,
        tutorial: tutorial.value,
        autor: {
            id: sessionStorage.getItem('userId')
        },
        titulo: titulo.value,
        foto: img64
    }

    const put = {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(dica)
    }

    await fetch(`http://localhost:8080/api/dica/${sessionStorage.getItem('dicaId')}`, put).then((response) => {
        response.json().then((resposta) => {
            if(resposta.status == 'OK'){
                document.getElementById('sucessoPut').style.display = 'block'
                titulo.value = ''
                material.value = ''
                tutorial.value = ''
                setTimeout(function(){window.location.href = 'dicas.html';}, 3000)
            }else{
                document.getElementById('msgErro').innerText = 'Não foi possível alterar seu Dica Sustentável!'
                document.getElementById('erro').style.display = 'flex'
            }
        })
    })
}

document.getElementById('close').addEventListener('click', function(){
    document.getElementById('erro').style.display = 'none'
})