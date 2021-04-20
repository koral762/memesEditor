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

function createLine(text = 'text', posX = gCanvas.width / 2, posY = gCanvas.height / 2) {

    return {
        txt: text,
        size: 40,
        align: 'center',
        color: 'black',
        pos: { x: posX, y: posY }

    }
}

function drawText(text, x, y, textIndex = 0) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[textIndex].color;
    gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[textIndex].size}px IMPACT`

    gCtx.textAlign = gMeme.lines[textIndex].align;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getImgById(imgId) {
    var imgObj = gImgs.find(function (img) {
        return imgId === img.id
    })
    return imgObj;
}


function memeTextSize(size) {
    if (size === 'get-bigger') {

        gMeme.lines[0].size += 5;
    } else {

        gMeme.lines[0].size -= 5;
    }

}


function renderCanvas() {

    gCtx.save()
    onImageClicked(gMeme.selectedImgId);

    setTimeout(() => {
        renderText();
    }, 200);
    gCtx.restore()

}

function renderText() {
    var textIndex = 0;

    gMeme.lines.forEach(function (line) {
        if (textIndex === gMeme.lines.length) return;
        drawText(line.txt, line.pos.x, line.pos.y, textIndex);
        textIndex++;
    });

}



// function renderCanvas() {
//     gCtx.save()
//     gCtx.fillStyle = "#ede5ff"
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
//     gCtx.restore()
//     if (gCircle) renderCircle()
// }

// function downloadCanvas(elLink) {
//     const data = gCanvas.toDataURL()
//     elLink.href = data
//     elLink.download = 'my-img.jpg'
// }