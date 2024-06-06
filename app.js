
document.getElementById('nPlayer').style.display = 'block';

function selecionarJogadores(numero) {
    numeroDeJogadores = numero;
    document.getElementById('nPlayer').style.display = 'none';
    alert('Você selecionou ' + numeroDeJogadores + ' jogador(es).');

    if (numeroDeJogadores == 1) {
        document.querySelector(".player1").style.display = "block";
        document.querySelector(".btnPronto").style.display = "block";
    } else {
        document.querySelector(".player2").style.display = "block";
        document.querySelector(".player1").style.display = "block";
        document.querySelector(".btnPronto").style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var millisecondsEl = document.querySelector('#milliseconds');
    let interval;
    let milliseconds = 0;
    var isPaused = false;

    function startTimer() {
        interval = setInterval(() => {
            if (!isPaused) {
                milliseconds += 10;
                millisecondsEl.textContent = formatMilliseconds(milliseconds);
            }
        }, 10);
    }

    function formatMilliseconds(ms) {
        const formatted = String(ms % 1000).padStart(3, '0');
        return formatted;
    }

    startTimer();
});

var btnPronto = document.querySelector('.btnPronto');
var container = document.querySelector('.container__informacoes');
var container2 = document.querySelector('.container__informacoes2');
var jogadorVez = document.querySelector('#jogadorDaVez');
var player1 = '', player2 = '', currentPlayerIndex = 0;
var players = [];

btnPronto.addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir o envio padrão do formulário
    

    player1 = document.querySelector('#jogador1').value.trim();
    player2 = document.querySelector('#jogador2').value.trim();

    if (!player1) {
        alert("Por favor, preencha o nome do Jogador.");
        document.querySelector('#jogador1').focus();
        return;
    }

    if (numeroDeJogadores == 2 && !player2) {
        alert("Por favor, preencha o nome do Jogador.");
        document.querySelector('#jogador2').focus();
        return;
    }


    players = (numeroDeJogadores == 2) ? [player1, player2] : [player1];

    console.log("Jogador 1:", player1);
    console.log("Jogador 2:", player2);
    console.log(players);

    container.style.display = 'none';
    container2.classList.toggle('show');

    jogadorVez.style.color = 'orange';
    jogadorVez.innerText = players[currentPlayerIndex];
});

var millisecondsEl = document.querySelector('#timer');
var millisecondsEl2 = document.querySelector('#timerOff');
var numeroSecreto = document.querySelector("#numeroSecreto");
var randomValue;

document.getElementById("btnGerar").addEventListener("click", function () {
    var min = 1;
    var max = 999;
    randomValue = getRandomArbitrary(min, max);
    console.log('Valor aleatório entre ' + min + ' e ' + max + ': ' + randomValue);

    millisecondsEl.style.display = 'none';
    millisecondsEl2.style.display = 'flex';
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var btnChutar = document.querySelector('#btnChute');
var inputChute = document.querySelector('#inputChute');
var imgAcertou = document.querySelector('.balao__acertou');
var imgErrouAlto = document.querySelector('.balao__alto');
var imgErrouBaixo = document.querySelector('.balao__baixo');

btnChutar.addEventListener('click', function (event) {
    console.log(event.target);  // Exibe o elemento do botão no console
    var chute = parseInt(inputChute.value, 10);
    console.log(chute);

    if (numeroDeJogadores == 2) {
        players = [player1, player2];
    } else {
        players = [player1];
    }


    if (chute === randomValue) {
        imgAcertou.classList.toggle('balao__acertou-show');
        imgAcertou.style.display = 'flex';
        imgErrouAlto.style.display = 'none';
        imgErrouBaixo.style.display = 'none';
    } else {
        if (chute > randomValue) {
            console.log("Errou! Número secreto menor que o chute");
            imgErrouBaixo.classList.toggle('balao__baixo-show');
            imgAcertou.style.display = 'none';
            imgErrouAlto.style.display = 'none';
            imgErrouBaixo.style.display = 'flex';
        } else {
            console.log("Errou! Número secreto maior que o chute");
            imgErrouAlto.classList.toggle('balao__alto-show');
            imgAcertou.style.display = 'none';
            imgErrouAlto.style.display = 'flex';
            imgErrouBaixo.style.display = 'none';
        }

        // Alterna entre os jogadores
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        // Atualiza o texto na tela
        document.getElementById('jogadorDaVez').innerText = players[currentPlayerIndex];
    }

    inputChute.value = '';
});


