'use script'
const KEYWORDS_SIZE = 3

var gPageIdx = 0
var gKeywords = []
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'imgs/meme-imgs/1.jpg', keywords: ['trump', 'funny'] },
    { id: 2, url: 'imgs/meme-imgs/2.jpg', keywords: ['love', 'dogs'] },
    { id: 3, url: 'imgs/meme-imgs/3.jpg', keywords: ['love', 'dogs'] },
    { id: 4, url: 'imgs/meme-imgs/4.jpg', keywords: ['sleep', 'cat'] },
    { id: 5, url: 'imgs/meme-imgs/5.jpg', keywords: ['baby', 'funny'] },
    { id: 6, url: 'imgs/meme-imgs/6.jpg', keywords: ['explaining', 'person'] },
    { id: 7, url: 'imgs/meme-imgs/7.jpg', keywords: ['baby', 'suprise'] },
    { id: 8, url: 'imgs/meme-imgs/8.jpg', keywords: ['curious', 'person'] },
    { id: 9, url: 'imgs/meme-imgs/9.jpg', keywords: ['laugh', 'baby'] },
    { id: 10, url: 'imgs/meme-imgs/10.jpg', keywords: ['laugh', 'obama'] },
    { id: 11, url: 'imgs/meme-imgs/11.jpg', keywords: ['kissing', 'fight'] },
    { id: 12, url: 'imgs/meme-imgs/12.jpg', keywords: ['you', 'person'] },
    { id: 13, url: 'imgs/meme-imgs/13.jpg', keywords: ['toast', 'leonardo-dicaprio'] },
    { id: 14, url: 'imgs/meme-imgs/14.jpg', keywords: ['metrix', 'glasses'] },
    { id: 15, url: 'imgs/meme-imgs/15.jpg', keywords: ['zero', 'fail'] },
    { id: 16, url: 'imgs/meme-imgs/16.jpg', keywords: ['suprise', 'disappointment'] },
    { id: 17, url: 'imgs/meme-imgs/17.jpg', keywords: ['putin', 'you'] },
    { id: 18, url: 'imgs/meme-imgs/18.jpg', keywords: ['toy-story', 'story'] }

];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            font: '40px arial',
            align: 'left',
            color1: 'white',
            color2: 'black',
            pos: { lat: 250, lng: 100 }
        }
    ]
}

function isLine(clickedPos) {
    // var
    gMeme.lines.forEach(line => {
        console.log(line.pos);
    })
    // console.log(gMeme.lines[0].pos);
}

function creatKeywordsArray() {

    gImgs.forEach(img => {
        img.keywords.forEach(key => {
            if (!gKeywords.includes(key)) gKeywords.push(key)
        })
    })
    var startIdx = gPageIdx * KEYWORDS_SIZE
    return gKeywords.slice(startIdx, startIdx + KEYWORDS_SIZE)
}

function nextKeyword() {
    gPageIdx++
    if (gPageIdx * KEYWORDS_SIZE >= gKeywords.length) gPageIdx = 0
}

function setLineTxt(memeText, textIdx) {
    gMeme.lines[textIdx].txt = memeText
}

function getImg(indx) {
    return gImgs[indx - 1]
}

function getGImgs() {
    return gImgs
}

function getGMeme() {
    // console.log(idxOfMeme);
    return gMeme
}

function updateGmeme(currMeme) {
    gMeme = currMeme
    // console.log(gMeme);
}