'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['tramp', 'politics']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['puppy', 'cute']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['puppy', 'cute', 'baby', 'sleep']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    }
];

var gElCanvas;
var gCtx;
var gCurrPos = {};
var gCurrLine = {};
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']



var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'text1',
            size: 40,
            align: 'center',
            color: 'black',
            pos: {},
            isDragging: false

        },
        {
            txt: 'text2',
            size: 40,
            align: 'center',
            color: 'black',
            pos: {},
            isDragging: false

        }

    ]
}


function oninit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx];

    setFirstPos();
    addListeners();

}

function onImageClicked(imgId) {

    gMeme.selectedImgId = parseInt(imgId);
    renderImgToCanvas(gMeme.selectedImgId);
    setTimeout(() => {
        renderText()
    }, 200);
}

function onDrawText() {
    var textIndex = gMeme.selectedLineIdx;
    gCurrPos = gMeme.lines[textIndex].pos;

    drawText(gMeme.lines[textIndex].txt, gCurrPos.x, gCurrPos.y,textIndex);
}


function onAddTextLine() {

    gMeme.lines.push(createLine());
    renderCanvas();
    console.log(gMeme.lines);
    gMeme.selectedLineIdx = gMeme.lines.length - 2;
    onSwitchLine();
}

function onSwitchLine() {

    gMeme.selectedLineIdx += 1;
    if (gMeme.selectedLineIdx === gMeme.lines.length) { gMeme.selectedLineIdx = 0 };
    console.log(gMeme.selectedLineIdx);
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx];
    gCurrPos = gMeme.lines[gMeme.selectedLineIdx].pos;

}


function onMoveLine(direc) {
    if (direc === 'get-up') {

        gCurrPos.y -= 5;

    } else {

        gCurrPos.y += 5;

    }
    renderCanvas();
}


function onInputText(txt) {
    onImageClicked(gMeme.selectedImgId);
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    setTimeout(() => {
        onDrawText()
    }, 200);

    var elMemeText = document.getElementById('meme-text');
    elMemeText.value = '';

}

function onTextSize(size) {

    memeTextSize(size);
    renderCanvas();

}


///////////////////////  Listeners  ///////////////////////////

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    gCurrLine.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gCurrLine.isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        gCurrLine.pos.x += dx
        gCurrLine.pos.y += dy

        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    gCurrLine.isDragging = false
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isLineClicked(clickedPos) {

    const { pos } = gCurrLine
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCurrLine.size
}
