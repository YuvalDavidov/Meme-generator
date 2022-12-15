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

    gImg = getImg(idxOfMeme)
    memeId = gImg.id

    var gMeme = getGMeme()
    gTextIdx = gMeme.selectedLineIdx
    gMemeText = gMeme.lines[gTextIdx].txt
    insideColor = gMeme.lines[gTextIdx].color1
    lineColor = gMeme.lines[gTextIdx].color2
    textFont = gMeme.lines[gTextIdx].font

    // addListeners()
    renderCanvas()
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    // addTouchListeners()

    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    //     renderMeme()
    // })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    // console.log(pos);
    isLine(pos)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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

    const img = new Image()
    img.src = gImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach(line => {
            drawText(line.txt, line.pos.lat, line.pos.lng, line.color1, line.color2, line.font)

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
