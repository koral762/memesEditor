'use strict'

function renderImgToCanvas(imgId) {

    var elImg = getImgById(imgId);
    elImg = elImg.url;

    var img = new Image();
    img.src = elImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }

}


function drawText(text, x, y) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[0].color;
    gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[0].size}px IMPACT`

    gCtx.textAlign = gMeme.lines[0].align;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getImgById(imgId) {
    var imgObj = gImgs.find(function (img) {
        return imgId === img.id
    })
    return imgObj;
}

function memeTextGetBigger() {
    console.log('yes');
    gCtx.font = '60px IMPACT'

}

function memeTextSize(size) {
    if (size === 'get-bigger') {

        gMeme.lines[0].size += 5;
    } else {

        gMeme.lines[0].size -= 5;
    }

}




function renderCanvas() {
    onImageClicked(gMeme.selectedImgId);

    setTimeout(() => {
        drawText(gMeme.lines[0].txt, gPos.x, gPos.y);
    }, 200);

}

// function downloadCanvas(elLink) {
//     const data = gCanvas.toDataURL()
//     elLink.href = data
//     elLink.download = 'my-img.jpg'
// }