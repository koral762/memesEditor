'use strict'

function setFirstPos() {
    gMeme.lines[0].pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 8 };
    gMeme.lines[1].pos = { x: gElCanvas.width / 2, y: gElCanvas.height - 20 };
    gCurrPos = gMeme.lines[0].pos;
}


function renderImgToCanvas(imgId) {

    var elImg = getImgById(imgId);
    elImg = elImg.url;

    var img = new Image();
    img.src = elImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }

}

function createLine(text = 'text', posX = gElCanvas.width / 2, posY = gElCanvas.height / 2) {

    return {
        txt: text,
        size: 40,
        align: 'center',
        color: 'black',
        pos: { x: posX, y: posY },
        isDragging: false
    }
}

function drawText(text, x, y, textindx) {
    console.log(textindx);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[textindx].color
    gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[textindx].size}px IMPACT`

    gCtx.textAlign = gMeme.lines[textindx].align;
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

        gMeme.lines[gMeme.selectedLineIdx].size += 5;
    } else {

        gMeme.lines[gMeme.selectedLineIdx].size -= 5;
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