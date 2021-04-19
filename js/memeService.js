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
    console.log(text);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px IMPACT'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getImgById(imgId) {
    var imgObj = gImgs.find(function (img) {
        return imgId === img.id
    })
    return imgObj;
}