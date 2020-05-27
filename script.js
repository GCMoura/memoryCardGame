const newGameButton = document.querySelector('.new-game-btn')
const cardDown = document.querySelectorAll('.card')
const cardTop = document.querySelectorAll('.card-top')
var cardNumber = 0 //para fazer a comparação entre os dois cards virados
var primeiro //primeiro card virado para comparação
var primeiroId //id do primeiro card
var segundo // segundo card virado para comparação
var segundoId // id do segundo card

var playerOne = document.querySelector('#player1')
var playerTwo = document.querySelector('#player2')
var playerFlag = false // usado para mudar o jogador e pontuar

var playerOneScore = parseInt(playerOne.value) //transformando em inteiro
var playerTwoScore = parseInt(playerTwo.value) //transformando em inteiro

var winner = 0 //controle para mostrar vencedor

//função para embaralhar as cartas no inicio do jogo
playGame()
function playGame(){
    //esconder o botão de novo jogo
    newGameButton.style.display = 'none'

    playerFlag = false // usado para mudar o jogador e pontuar

    winner = 0 //controle para mostrar vencedor

    // lógica para virar todos os cards
    cardTop.forEach(card => {
        let id = card.id.split('-') //como o id é card-1, é necessário essa lógica para tirar só o número
        id = parseInt(id[1])
        id -= 1
        //virando os cards
        cardDown[id].style.zIndex = "0"
        cardTop[id].style.zIndex = "1"
    })


    const array = ['eiffel', 'gize', 'liberdade', 'muralha', 'coliseu','eiffel', 'gize', 'liberdade', 'muralha', 'coliseu']
    var list = [] //array para sortear uma ordem aleatória
    var img = [] //array para colocar as imgs em ordem aleatória nos cards
    var contador = 0

    //iniciar a pontuação dos jogadores em zero
    playerOne.value = ''
    playerTwo.value = ''
    playerOneScore = 0
    playerTwoScore = 0

    //preencher o array list para que todos os ids das imagens sejam duplicados, conforme o array
    while(list.length < cardDown.length){
        var index = Math.floor(Math.random() * array.length)
        if(list.indexOf(index) == -1) {
            list.push(index)
        }
    }
    //preencher o array de img com ordem aleatória
    for (i = 0; i < list.length; i++){
        let ind = list[i]
        img[i] = array[ind]
    }

    //coloca as img em ordem aleatória em cada um dos card que estão escondidos
    cardDown.forEach(card => {
        card.lastChild.setAttribute('src', `./img/${img[contador]}.jpg`)
        card.lastChild.setAttribute('id', img[contador])
        contador += 1 //incementar o indice do array para mudar a imagem a ser colocada
    })       
}

//para cada card de cima, chama a função para mostrar o card de baixo
cardTop.forEach(card => {
    let id = card.id.split('-') //como o id é card-1, é necessário essa lógica para tirar só o número
    id = parseInt(id[1])
    id -= 1
    card.addEventListener('click', function(){turnCard(id)}, false) //passar para a função para fazer o card virar
})

function turnCard(id){
    cardDown[id].style.zIndex = "1"
    cardTop[id].style.zIndex = "0"
    cardNumber += 1 //controle para saber se é o primeiro card ou o segundo

    if(cardNumber % 2 != 0){ //se for impar é o primeiro a ser clicado
        primeiro = cardDown[id].lastChild.id //id da imagem que será usada para comparar
        primeiroId = id // id do card que será usado para desvirar o card

    } else { // se for par é o segundo a ser clicado
        segundo = cardDown[id].lastChild.id
        segundoId = id

        //comparando os dois id dos cards
        //se forem iguais, mantem os card virados e marca ponto
        if(primeiro == segundo){
            //flag false para jogador 1 e flag true para o jogador 2
            if(playerFlag == false){
                playerOneScore += 1
                playerOne.value = playerOneScore
            } else if(playerFlag == true){
                playerTwoScore += 1
                playerTwo.value = playerTwoScore
            }

            winner ++

            //se houve 5 acertos, o jogo chegou ao fim. resta ver quem venceu
            if(winner == 5){
                // se o jogador 1 tiver mais acertos, o jogador 1 venceu
                if(playerOneScore > playerTwoScore) {
                    endGame(playerFlag)
                }
                //se o jogador 2 tiver mais acertos, o jogador 2 venceu
                if(playerOneScore < playerTwoScore) {
                    endGame(playerFlag)
                }
            }

            primeiro = ''
            primeiroId = ''
            segundo = ''
            segundoId = ''

            //se forem diferentes, aguarda 1 segundo e vira os card novamente
        } else {

            setTimeout(() => {
                cardDown[primeiroId].style.zIndex = "0"
                cardTop[primeiroId].style.zIndex = "1"

                cardDown[segundoId].style.zIndex = "0"
                cardTop[segundoId].style.zIndex = "1"

                if(playerFlag == false){
                    playerFlag = true
                } else {
                    playerFlag = false
                }

                primeiro = ''
                primeiroId = ''
                segundo = ''
                segundoId = ''
                
            }, 500)
        }      
    }
}

//função para indicar o vencedor
function endGame(flag){
    var control = 0
    console.log(winner)
    if(flag == false){ //significa que o jogador 1 ganhou
        var showWinner = setInterval(() => {
            document.querySelector('.player-one').style.backgroundColor = 'green'
            playerOne.style.background = 'green'
            
            if(control == 4){
                clearInterval(showWinner)
                document.querySelector('.player-one').style.backgroundColor = 'tomato'
                playerOne.style.background = 'tomato'
                newGameButton.style.display = "block"
            }
            control ++            
        }, 1000);
        
        newGameButton.addEventListener('click', playGame, false) //chama a funçao playGame para iniciar um novo jogo
    }
    if(flag == true){ //significa que o jogador 2 ganhou
        var showWinner = setInterval(() => {
            document.querySelector('.player-two').style.backgroundColor = 'green'
            playerTwo.style.background = 'green'
            
            if(control == 4){
                clearInterval(showWinner)
                document.querySelector('.player-two').style.backgroundColor = 'tomato'
                playerTwo.style.background = 'tomato'
                newGameButton.style.display = "block"
            }
            control ++            
        }, 1000);
        
        newGameButton.addEventListener('click', playGame, false) //chama a funçao playGame para iniciar um novo jogo
    }
}