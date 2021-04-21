'use strict'

const KEY='meme';
const KEY2='memes';

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var val = JSON.parse(str);
    return val;
}


function removeFromStorage(key) {
    localStorage.removeItem(key)
}

var gTemp = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'text1',
            size: 40,
            align: 'center',
            color: 'black',
            pos: {},
            isDragging: false,
            selected: true,
            font: 'IMPACT'
        },
        {
            txt: 'text2',
            size: 40,
            align: 'center',
            color: 'black',
            pos: {},
            isDragging: false,
            selected: false,
            font: 'IMPACT'
        }

    ]
}