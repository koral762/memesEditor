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
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['sleep', 'cat', 'keyboard', 'bored']
    }

];

var gElCanvas;
var gCtx;
var gCurrPos = {};
var gCurrLine = {};
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gmems = [];


var gMeme = gTemp;

function oninit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    viewFromStorage();
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx];
    renderImages();
    addListeners();
}

function viewFromStorage() {

    if (!loadFromStorage(KEY)) {
        saveToStorage(KEY, gMeme)
        setFirstPos();

    } else {
        gMeme = loadFromStorage(KEY);

        if (gMeme.selectedLineIdx < 0) { gMeme.selectedLineIdx = 0 };
        gCurrPos = gMeme.lines[gMeme.selectedLineIdx].pos;
        renderCanvas();
    }
}

function renderImages() {
    var elImagesContainer = document.querySelector('.image-container');

    var strHtml = '';

    for (var i = 1; i <= gImgs.length; i++) {

        strHtml += ` <img src="img/${i}.jpg" id="${i}" onclick="onImageClicked(this.id)">`
    }

    elImagesContainer.innerHTML = strHtml;
}

function onImageClicked(imgId) {

    var elContainer = document.querySelector('.canvas-container')
    elContainer.style.display = 'flex'
    var elImgs = document.querySelector('.Image-Gallery')
    elImgs.style.display = 'none'
    
    gMeme.selectedImgId = parseInt(imgId);
    renderImgToCanvas(gMeme.selectedImgId);

    setTimeout(() => {
        renderText()
    }, 200);

}

function onReturnGallery() {

    removeFromStorage(KEY);

    var elContainer = document.querySelector('.canvas-container')
    elContainer.style.display = 'none'
    var elImgs = document.querySelector('.Image-Gallery')
    elImgs.style.display = 'grid'
}

function onDrawText() {
    var textIndex = gMeme.selectedLineIdx;
    gCurrPos = gMeme.lines[textIndex].pos;

    drawText(gMeme.lines[textIndex].txt, gCurrPos.x, gCurrPos.y, textIndex);
}


function onAddTextLine() {

    gMeme.lines.push(createLine());
    renderCanvas();
    console.log(gMeme.lines);
    gMeme.selectedLineIdx = gMeme.lines.length - 2;
    onSwitchLine();
}

function onSwitchLine() {
    if (gMeme.selectedLineIdx < 0) { gMeme.selectedLineIdx = 0 };

    gMeme.selectedLineIdx += 1;
    if (gMeme.selectedLineIdx === gMeme.lines.length) { gMeme.selectedLineIdx = 0 };
    console.log(gMeme.selectedLineIdx);
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx];
    gCurrPos = gMeme.lines[gMeme.selectedLineIdx].pos;
    renderCanvas();
}

function onRemoveLine() {

    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    renderCanvas();
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

function onTextAlighn(align) {

    memeTextAlighn(align);
    renderCanvas();
}

function onFontEdit(font) {

    memeTextFont(font);
    renderCanvas();
}

function onTextColor(color) {

    memeTextColor(color);
    renderCanvas();
}

function onSaveMeme() {

    clearSelected();

    if (!loadFromStorage(gmems)) {

        gmems.push(gMeme);
        saveToStorage(KEY2, gmems);

    } else {
        gmems.push(gMeme);
        saveToStorage(KEY2, gmems);
    }
}

function onDownloadImg() {

    clearSelected();

    setTimeout(() => {
        downloadimg()
    }, 1000);
}

function downloadimg() {

    var download = document.getElementById("download");
    var image = document.getElementById("my-canvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

    download.setAttribute("href", image);

}

function clearSelected() {
    gMeme.selectedLineIdx = -1;
    renderCanvas();
}

function onEdit() {

    gMeme.selectedLineIdx = 0;
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
