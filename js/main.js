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

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

var gCanvas;
var gCtx;

function oninit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}

function onImageClicked(imgId) {

    gMeme.selectedImgId = parseInt(imgId);
    renderImgToCanvas(gMeme.selectedImgId);

}


function onDrawText() {

    drawText(gMeme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8);
}



function onInputText(txt) {
    gMeme.lines[0].txt = txt;
    setTimeout(() => {
        onDrawText()
    }, 200);

    var elMemeText = document.getElementById('meme-text');
    elMemeText.value = '';

}