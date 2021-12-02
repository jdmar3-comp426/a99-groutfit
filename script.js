const QUOTES = 'http://api.quotable.io/random'
const timeToShow = document.getElementById('timer')
var displayTime;
var displayT = document.getElementById('displayT')
var countErr = document.getElementById('countErr')
var count = 0;
var totalErr = 0
var displayErr = document.getElementById('displayErr')
var prevErr;
var displayAcc = document.getElementById('displayAcc');
var accuracy = 100
var prevAccuracy;
var prevAcc = document.getElementById('prevAcc')
const textToType = document.getElementById('quoteDisplay')
const textTyped = document.getElementById('quoteInput')



textTyped.addEventListener('input', () => {
    const quote = textToType.querySelectorAll('span')
    const quoteInput = textTyped.value.split('')

    let right = true
    count = 0;
    quote.forEach((ch, index) => {
        const c = quoteInput[index]
        if (c == null) {
            ch.classList.remove('right')
            ch.classList.remove('notRight')
            right = false
        } else if (c === ch.innerText) {
            ch.classList.add('right')
            ch.classList.remove('notRight')
        } else {
            ch.classList.remove('right')
            ch.classList.add('notRight')
            right = false
            count = count + 1
            countErr.textContent = totalErr + count
            accuracy = 100 - count/quoteInput.length*100
        }
    })

    if (quoteInput.length === quote.length) {
        displayTime = getTimerTime();
        prevErr = count
        prevAccuracy = 100 - prevErr/quoteInput.length*100
        newQuote();
    }
    displayErr.textContent = prevErr
    displayT.textContent = displayTime
    displayAcc.textContent = accuracy
    prevAcc.textContent = prevAccuracy
})

let startT
function start() {
    timeToShow.innerText = 0
    startT = new Date()
    setInterval(() => {timer.innerText = getTimerTime()}, 10)
}

function getTimerTime() {
    var time = new Date() - startT
    var sex = Math.floor(time / 1000) % 60
    var mins = Math.floor(time / 60000) % 100
    var milli = Math.floor(time / 10) % 100
    var offMins;
    if (mins === 0) {
        offMins = "00"
    } else if (mins < 10) {
        offMins = "0" + mins
    } else {
        offMins = mins
    }
    return offMins + (sex < 10 ? ":0" : ":") + sex + "." + (milli === 0 ? "00" : milli)
}

function fetchQuote() {
    return fetch(QUOTES)
        .then(response => response.json())
        .then(data => data.content)
}

async function newQuote() {
    totalErr = 0
    countErr.textContent = totalErr
    accuracy = 100
    displayAcc.textContent = accuracy
    const quote = await fetchQuote()
    textToType.innerHTML = ''
    quote.split('').forEach(c => {
        const ch = document.createElement('span')
        ch.innerText = c
        textToType.appendChild(ch)
    })
    textTyped.value = null
    start()
}

newQuote()