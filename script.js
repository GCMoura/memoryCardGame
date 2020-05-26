const cardDown = document.querySelectorAll('.card')
const cardTop = document.querySelectorAll('.card-top')

//função para embaralhar as cartas no inicio do jogo
playGame()
function playGame(){
    const array = ['eiffel', 'gize', 'liberdade', 'muralha', 'coliseu','eiffel', 'gize', 'liberdade', 'muralha', 'coliseu']

    var index = Math.random()

    cardDown.forEach(card => {
        let id = card.id.split('-') //como o id é card-1, é necessário essa lógica para tirar só o número
        id = parseInt(id[1])
        id -= 1
        

        
    })       
}

//para card de cima, chama a função para mostrar o card de baixo
cardTop.forEach(card => {
    let id = card.id.split('-') //como o id é card-1, é necessário essa lógica para tirar só o número
    id = parseInt(id[1])
    id -= 1
    card.addEventListener('click', function(){turnCardTop(id)}, false) //passar para a função para fazer o card virar
})

function turnCardTop(id){
    cardDown[id].style.zIndex = "1"
    cardTop[id].style.zIndex = "0"
}


// para cada card de baixo clicado, chama a função para mostrar novamente o card de cima
cardDown.forEach(card => {
    
    let id = card.id.split('-')
    id = parseInt(id[1])
    id -= 1
    card.addEventListener('click', function(){turnCard(id)}, false)
})

function turnCard(id){
    cardDown[id].style.zIndex = "0"
    cardTop[id].style.zIndex = "1"
}