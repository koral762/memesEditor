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

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'bla bla',
            size: 40,
            align: 'center',
            color: 'black'

        }
    ]
}


function onMoveLine(direc) {
    if (direc === 'get-up') {

        gPos.y -= 5;

    } else {

        gPos.y += 5;

    }
    renderCanvas();
}

function oninit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    gPos = { x: gCanvas.width / 2, y: gCanvas.height / 8 };
}

function onImageClicked(imgId) {

    gMeme.selectedImgId = parseInt(imgId);
    renderImgToCanvas(gMeme.selectedImgId);

}




function onDrawText() {

    drawText(gMeme.lines[0].txt, gPos.x, gPos.y);
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