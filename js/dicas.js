if(sessionStorage.getItem('token') == null){
    location.replace('http://127.0.0.1:5500/index.html')
}

const main = document.getElementById('main')
const view = document.getElementById('viewDica')
const container = document.getElementById('containerDica')
const todas = document.getElementById('todas')
const minhas = document.getElementById('minhas')
const todasDicas = document.getElementById('todasDicas')
const minhasDicas = document.getElementById('minhasDicas')
const barra = document.getElementById('barra')
const btEditar = document.getElementById('btEditar')
const btExcluir = document.getElementById('btExcluir')
const deletarDiv = document.getElementById('deletarDiv')
const excluir = document.getElementById('excluir')
const cancelar = document.getElementById('cancelar')

const nomeUser = document.getElementById('nomeUsuario')
nomeUser.innerText = sessionStorage.getItem("username")

const perfil = document.getElementById('perfil')
perfil.src = sessionStorage.getItem('fotoPerfil')


document.addEventListener('DOMContentLoaded', function(){
    listarTodas()
    listarMinhas()
})

async function listarTodas(){
    await fetch(`http://localhost:8080/api/dica`).then((response) => {
        response.json().then((dicas) => {

            if(dicas != ''){
                document.getElementById('aviso').style.display = 'none'
                dicas.forEach(dica => {
                    const divDica = document.createElement('div')
                    divDica.className = 'dica'
    
                    const divImg = document.createElement('div')
                    divImg.className = 'divImg'
    
                    const img = document.createElement('img')
                    img.classList = 'foto'
                    img.src = dica.foto
                    if(dica.foto == null){
                        img.src = '../img/fundo_dica.png'
                    }
    
                    const infos = document.createElement('div')
                    infos.className = 'infos'
    
                    const titulo = document.createElement('p')
                    titulo.className = 'titulo'
                    titulo.innerText = dica.titulo
    
                    const autorNome = document.createElement('span')
                    autorNome.className = 'autorNome'
                    autorNome.innerText = dica.autor.userName
    
                    const autor = document.createElement('p')
                    autor.classList = 'autor'
                    autor.innerText = 'By '
                    autor.appendChild(autorNome)
    
                    infos.appendChild(titulo)
                    infos.appendChild(autor)
    
                    divImg.appendChild(img)
                    divDica.appendChild(divImg)
                    divDica.appendChild(infos)
                    divDica.id = dica.id
    
                    divDica.addEventListener('click', async function (){
                
                        await fetch(`http://localhost:8080/api/dica/${dica.id}`).then((response) => {
                            response.json().then((dica) => {
                                const materiais = dica.material.split(';')
                                const passos = dica.tutorial.split(';')
                                
                               const h2 = document.createElement('h2')
                               h2.innerText = dica.titulo
    
                               const h4Mat = document.createElement('h4')
                               h4Mat.innerText = 'Materiais:'
    
                               const ul = document.createElement('ul')
                               materiais.forEach(material => {
                                let li = document.createElement('li')
                                li.innerText = material
                                ul.appendChild(li)
                               });
    
                               const h4Tut = document.createElement('h4')
                               h4Tut.innerText = 'Tutorial:'
    
                               const ol = document.createElement('ol')
                               passos.forEach(passo => {
                                let liPasso = document.createElement('li')
                                liPasso.innerText = passo
                                ol.appendChild(liPasso)
                               });
    
                               container.appendChild(h2)
                               container.appendChild(h4Mat)
                               container.appendChild(ul)
                               container.appendChild(h4Tut)
                               container.appendChild(ol)
    
                               if(dica.foto != null){
                                const imgDicaAbertaDiv = document.createElement('div')
                               imgDicaAbertaDiv.className = 'imgDicaAbertaDiv'
    
                               const h4Foto = document.createElement('h4')
                               h4Foto.innerText = 'Foto:'
    
                               const imgDicaAberta = document.createElement('img')
                               imgDicaAberta.src = dica.foto
                               imgDicaAberta.className = 'imgDicaAberta'
    
                               imgDicaAbertaDiv.appendChild(h4Foto)
                               imgDicaAbertaDiv.appendChild(imgDicaAberta)
                               container.appendChild(imgDicaAbertaDiv)
                               }
    
                               const pCriador = document.createElement('p')
                               pCriador.innerText = `Publicado por ${dica.autor.userName}`
                               pCriador.className = 'criador'
    
                               if(dica.autor.id == sessionStorage.getItem('userId')){
                                const btEditarLet = document.createElement('button')
                               btEditarLet.id = 'btEditar'
                               btEditarLet.innerText = 'Editar'
    
                               const btExcluirLet = document.createElement('button')
                               btExcluirLet.id = 'btExcluir'
                               btExcluirLet.innerText = 'Excluir'
    
                               container.appendChild(btEditarLet)
                               container.appendChild(btExcluirLet)
    
                               btExcluirLet.addEventListener('click', function(){
                                deletarDiv.style.display = 'block'
                                excluir.addEventListener('click', async function() {
                                    const deleteMet = {
                                        method: 'DELETE'
                                    }
    
                                    await fetch(`http://localhost:8080/api/dica/${dica.id}`, deleteMet).then((response) => {
                                        response.json().then((resposta) => {
                                            if(resposta.status == 'OK'){
                                                deletarDiv.innerHTML = '<b><p>Dica Sustentável deletada com sucesso</p></b>'
                                                setTimeout(function(){window.location.reload();}, 3000)
                                            }else{
                                                deletarDiv.innerHTML = '<b><p>Não foi possível deletar a Dica Sustentável</p></b>'
                                                setTimeout(function(){window.location.reload();}, 3000)
                                            }
                                        })
                                    })
                                })
                               })
    
                               btEditarLet.addEventListener('click', function(){
                                sessionStorage.setItem('dicaId', dica.id)
                                location.href = './formDica.html'
                               })
    
                               
                               }
    
                               container.appendChild(pCriador) 
                               
                               view.style.display = 'flex'
                            })
                        })
                    })
    
                    todas.append(divDica)
                });
            }
        })
    })
}

async function listarMinhas(){
    await fetch(`http://localhost:8080/api/dica/autor/${sessionStorage.getItem('userId')}`).then((response) => {
        response.json().then((dicas) => {

            if(dicas != ''){
                document.getElementById('aviso').style.display = 'none'
                dicas.forEach(dica => {
                    const divDica = document.createElement('div')
                    divDica.className = 'dica'
    
                    const divImg = document.createElement('div')
                    divImg.className = 'divImg'
    
                    const img = document.createElement('img')
                    img.classList = 'foto'
                    img.src = dica.foto
                    if(dica.foto == null){
                        img.src = '../img/fundo_dica.png'
                    }
    
                    const infos = document.createElement('div')
                    infos.className = 'infos'
    
                    const titulo = document.createElement('p')
                    titulo.className = 'titulo'
                    titulo.innerText = dica.titulo
    
                    const autorNome = document.createElement('span')
                    autorNome.className = 'autorNome'
                    autorNome.innerText = dica.autor.userName
    
                    const autor = document.createElement('p')
                    autor.classList = 'autor'
                    autor.innerText = 'By '
                    autor.appendChild(autorNome)
    
                    infos.appendChild(titulo)
                    infos.appendChild(autor)
    
                    divImg.appendChild(img)
                    divDica.appendChild(divImg)
                    divDica.appendChild(infos)
                    divDica.id = dica.id
    
                    divDica.addEventListener('click', async function (){
                
                        await fetch(`http://localhost:8080/api/dica/${dica.id}`).then((response) => {
                            response.json().then((dica) => {
                                const materiais = dica.material.split(';')
                                const passos = dica.tutorial.split(';')
                                
                               const h2 = document.createElement('h2')
                               h2.innerText = dica.titulo
    
                               const h4Mat = document.createElement('h4')
                               h4Mat.innerText = 'Materiais:'
    
                               const ul = document.createElement('ul')
                               materiais.forEach(material => {
                                let li = document.createElement('li')
                                li.innerText = material
                                ul.appendChild(li)
                               });
    
                               const h4Tut = document.createElement('h4')
                               h4Tut.innerText = 'Tutorial:'
    
                               const ol = document.createElement('ol')
                               passos.forEach(passo => {
                                let liPasso = document.createElement('li')
                                liPasso.innerText = passo
                                ol.appendChild(liPasso)
                               });
    
                               container.appendChild(h2)
                               container.appendChild(h4Mat)
                               container.appendChild(ul)
                               container.appendChild(h4Tut)
                               container.appendChild(ol)
    
                               if(dica.foto != null){
                                const imgDicaAbertaDiv = document.createElement('div')
                               imgDicaAbertaDiv.className = 'imgDicaAbertaDiv'
    
                               const h4Foto = document.createElement('h4')
                               h4Foto.innerText = 'Foto:'
    
                               const imgDicaAberta = document.createElement('img')
                               imgDicaAberta.src = dica.foto
                               imgDicaAberta.className = 'imgDicaAberta'
    
                               imgDicaAbertaDiv.appendChild(h4Foto)
                               imgDicaAbertaDiv.appendChild(imgDicaAberta)
                               container.appendChild(imgDicaAbertaDiv)
                               }
    
                               const pCriador = document.createElement('p')
                               pCriador.innerText = `Publicado por ${dica.autor.userName}`
                               pCriador.className = 'criador'
    
                               if(dica.autor.id == sessionStorage.getItem('userId')){
                                const btEditarLet = document.createElement('button')
                               btEditarLet.id = 'btEditar'
                               btEditarLet.innerText = 'Editar'
    
                               const btExcluirLet = document.createElement('button')
                               btExcluirLet.id = 'btExcluir'
                               btExcluirLet.innerText = 'Excluir'
    
                               container.appendChild(btEditarLet)
                               container.appendChild(btExcluirLet)
    
                               btExcluirLet.addEventListener('click', function(){
                                deletarDiv.style.display = 'block'
                                excluir.addEventListener('click', async function() {
                                    const deleteMet = {
                                        method: 'DELETE'
                                    }
    
                                    await fetch(`http://localhost:8080/api/dica/${dica.id}`, deleteMet).then((response) => {
                                        response.json().then((resposta) => {
                                            if(resposta.status == 'OK'){
                                                deletarDiv.innerHTML = '<b><p>Dica Sustentável deletada com sucesso</p></b>'
                                                setTimeout(function(){window.location.reload();}, 3000)
                                            }else{
                                                deletarDiv.innerHTML = '<b><p>Não foi possível deletar a Dica Sustentável</p></b>'
                                                setTimeout(function(){window.location.reload();}, 3000)
                                            }
                                        })
                                    })
                                })
                               })
    
                               btEditarLet.addEventListener('click', function(){
                                sessionStorage.setItem('dicaId', dica.id)
                                location.href = './formDica.html'
                               })
    
                               
                               }
    
                               container.appendChild(pCriador) 
                               
                               view.style.display = 'flex'
                            })
                        })
                    })
    
                    minhas.append(divDica)
                });
            } else{
                
            }
        })
    })
}

/**view.addEventListener('click', function() {
    view.style.display = 'none'
    container.innerHTML = ''
}) */



todasDicas.addEventListener('click', function() {
    todas.style.display = 'flex'
    minhas.style.display = 'none'
    barra.style.transform = 'translateX(0%)'
    barra.style.animation = 'moverBarra 0.5s reverse'
})

minhasDicas.addEventListener('click', function() {
    minhas.style.display = 'flex'
    todas.style.display = 'none'
    barra.style.transform = 'translateX(100%)'
    barra.style.animation = 'moverBarra 0.5s'
})

barra.addEventListener('animationend', function(){
    barra.style.animation = ''
})

function printar(value){
    console.log(value)
}

function clickMenu(){
    if(itens.style.display == 'block') {
        itens.style.display = 'none';
    } else {
        itens.style.display = 'block';
    }
} 
