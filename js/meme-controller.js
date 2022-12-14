'use script'
let gElCanvas
let gCtx
let gMemeText
let gTextIdx
let memeId
let gImg

let lineColor
let insideColor
let textFont

function initMemeCanvas(idxOfMeme) {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    var gMeme = getGMeme()
    gImg = getImg(idxOfMeme)

    memeId = gImg.id
    gTextIdx = gMeme.selectedLineIdx
    gMemeText = gMeme.lines[gTextIdx].txt
    insideColor = gMeme.lines[gTextIdx].color1
    lineColor = gMeme.lines[gTextIdx].color2
    textFont = gMeme.lines[gTextIdx].font

    renderCanvas()
    renderMeme()
}

function onChangeLine() {
    if (gTextIdx === gMeme.lines.length - 1) {
        gTextIdx = 0
        gMemeText = gMeme.lines[gTextIdx].txt

    } else gTextIdx++
    gMeme.selectedLineIdx = gTextIdx
}

function onChangeFontSize(val) {
    textFont = gMeme.lines[gTextIdx].font
    var fontSize = textFont.substring(0, 2)
    var newFontSize = fontSize
    if (val.innerText === 'A+') fontSize++
    else fontSize--
    textFont = textFont.replace(newFontSize, fontSize)
    gMeme.lines[gTextIdx].font = textFont
    renderMeme()
}

function onChangeLineColor(val) {
    lineColor = val
    gMeme.lines[gTextIdx].color2 = lineColor
    renderMeme()
}

function onChangeInsideColor(val) {
    insideColor = val
    gMeme.lines[gTextIdx].color1 = insideColor
    console.log(gMeme);
    renderMeme()
}

function onCreatLine() {
    creatMemeLine()
    gTextIdx++
    gMeme.selectedLineIdx = gTextIdx
    renderMeme()
}

function onGetKey(val) {
    gMemeText = val
    setLineTxt(gMemeText, gTextIdx)
    renderMeme()
    console.log(gMeme);

}

function renderMeme() {
    var height = 100
    const img = new Image()
    img.src = gImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach(line => {
            drawText(line.txt, 250, height, line.color1, line.color2, line.font)
            height += 100
        })

    }


}

function drawText(text, x, y, gTxtColor, lineColor, textFont) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = lineColor
    gCtx.fillStyle = gTxtColor
    gCtx.font = textFont;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function renderCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
