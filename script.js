const documento = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longButton = document.querySelector('.app__card-button--longo')
const img = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const botaoComecar = document.querySelector('#start-pause')
const iniciarOuPausarbt = document.querySelector('#start-pause span')
const imgComecaPausar = document.querySelector('.app__card-primary-butto-icon')

const musicaInput = documento.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const sonIniciar = new Audio('/sons/play.wav')
const sonPause = new Audio('/sons/pause.mp3')
const sonFim = new Audio('/sons/beep.mp3')

const temporiador = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

botaoComecar.addEventListener('click', iniciar)

focoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 2400
    alterarContexto('foco')
    focoButton.classList.add('active')
})

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longButton.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    documento.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `./imagens/${contexto}.png`)
    switch(contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superficície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`

    }
}

function mostrarTempo () {
    const tempo = new Date (tempoDecorridoEmSegundos *1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporiador.innerHTML = `${tempoFormatado}`
}


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        //sonFim.play()
        parar()
        alert('Tempo esgotado!')
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

function iniciar() {
    if(intervaloId){
        sonPause.play()
        parar()
        return
    }
    sonIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarbt.textContent = 'Pausar'
    imgComecaPausar.setAttribute('src', '/imagens/pause.png')
}

function parar() {
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarbt.textContent = 'Começar'
    imgComecaPausar.setAttribute('src', '/imagens/play_arrow.png')

    if(tempoDecorridoEmSegundos <= 0) {
        tempoDecorridoEmSegundos = 5
    }
}

mostrarTempo()