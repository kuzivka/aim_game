
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let interval = 0
let time = 0
let score = 0
let r = 0, g = 0, b = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createCircle()
    }
})

function startGame() {
    timeEl.parentNode.classList.remove('hide');
    board.innerHTML = " "
    interval = setInterval(decreaseTime, 1000)
    createCircle()
    setTime(time)
}


function decreaseTime() {
    if (time === 0) {
        clearInterval(interval)
        finishGame()

    } else if (time > 0) {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)

    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1><a id="replay" class="start" >Replay</a>`
    const replay = document.querySelector('#replay')
    replay.addEventListener('click', () => {
        score = 0
        screens[1].classList.remove('up');

    })
}

function createCircle() {
    let circle = document.createElement('div')
    let size = getRandomNumber(10, 50)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    getColor()
    setColor(circle)

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    element.style.background = `rgb(${r}, ${g}, ${b})`;
}

function getColor() {
    r = Math.floor(Math.random() * 255)
    g = Math.floor(Math.random() * 255)
    b = Math.floor(Math.random() * 255)
}