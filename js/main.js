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

var gCanvas;
var gCtx;
var gPos = {};
var gCurrMeme = {};

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'bla bla',
            size: 40,
            align: 'center',
            color: 'black',
            pos: {}

        }

    ]
}


function oninit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    gMeme.lines[gMeme.selectedLineIdx].pos = { x: gCanvas.width / 2, y: gCanvas.height / 8 };
    gPos = gMeme.lines[gMeme.selectedLineIdx].pos;
}

function onImageClicked(imgId) {

    gMeme.selectedImgId = parseInt(imgId);
    renderImgToCanvas(gMeme.selectedImgId);

}

function onDrawText() {
    var textIndex = gMeme.selectedLineIdx;

    drawText(gMeme.lines[textIndex].txt, gPos.x, gPos.y);
}


function onAddTextLine() {

    gMeme.lines.push(createLine());
    renderCanvas();
    console.log(gMeme.lines);
}

function onMoveLine(direc) {
    if (direc === 'get-up') {

        gPos.y -= 5;

    } else {

        gPos.y += 5;

    }
    renderCanvas();
}


function onInputText(txt) {
    onImageClicked(gMeme.selectedImgId);
    gMeme.lines[0].txt = txt;
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