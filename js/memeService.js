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
        isDragging: false,
        selected: false,
        font:'IMPACT'
    }
}

function drawText(text, x, y, textindx) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[textindx].color
    gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[textindx].size}px ${gMeme.lines[textindx].font}` 
    gCtx.textAlign = gMeme.lines[textindx].align;
    
    if (textindx===gMeme.selectedLineIdx) {
        gCtx.shadowBlur = 1;
        gCtx.shadowColor = "yellow";
    }else{
        gCtx.shadowBlur = 0;
    }
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

function memeTextAlighn(align) {
    if (align === 'get-left') {

        gMeme.lines[gMeme.selectedLineIdx].align = 'left';
    } else if(align === 'get-right'){

        gMeme.lines[gMeme.selectedLineIdx].align = 'right';
    }else{
        
        gMeme.lines[gMeme.selectedLineIdx].align = 'center';
    }
}

function memeTextFont(font){
    
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function memeTextColor(color){
    
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}



function renderCanvas() {

    gCtx.save()
    onImageClicked(gMeme.selectedImgId);

    setTimeout(() => {
        renderText();
    }, 200);
    gCtx.restore()

    saveToStorage(KEY, gMeme);

}

function renderText() {
    var textIndex = 0;

    gMeme.lines.forEach(function (line) {
        if (textIndex === gMeme.lines.length) return;
        drawText(line.txt, line.pos.x, line.pos.y, textIndex);
        textIndex++;
    });
    saveToStorage(KEY, gMeme);

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