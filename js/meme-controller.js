'use script'


let gElCanvas
let gCtx
let gCurrMeme
let gTextIdx
let gCurrLine

let gMemeText
let memeId
let gImg

let insideColor
let textFont

function initMemeCanvas(idxOfMeme) {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    gImg = getImg(idxOfMeme)
    memeId = gImg.id

    gCurrMeme = getGMeme()
    gCurrMeme.selectedImgId = memeId
    gTextIdx = gCurrMeme.selectedLineIdx
    gCurrLine = gCurrMeme.lines[gTextIdx]
    gMemeText = gCurrLine.txt

    textFont = gCurrLine.font

    document.querySelector('.txt-input').value = gMemeText
    // addListeners()
    renderCanvas()
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
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
    console.log(pos);
    isLine(pos)
}

function getEvPos(ev) {
    let pos = {
        lat: ev.offsetX,
        lng: ev.offsetY
    }
    return pos
}

function onMoveLine(el) {
    console.log(gCurrLine);
    if (el.innerText === '⬆️') gCurrLine.pos.lng -= 5
    else if (el.innerText === '⬇️') gCurrLine.pos.lng += 5
    else if (el.innerText === '⬅️') gCurrLine.pos.lat -= 5
    else gCurrLine.pos.lat += 5

    renderMeme()
    updateGmeme(gCurrMeme)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onChangeLine() {
    if (gCurrMeme.lines.length === 0 || gCurrMeme.lines.length === 1) return
    if (gTextIdx === gCurrMeme.lines.length - 1 && gTextIdx !== 0) {
        gTextIdx = 0
    } else gTextIdx++
    gCurrMeme.selectedLineIdx = gTextIdx
    gCurrLine = gCurrMeme.lines[gTextIdx]
    gMemeText = gCurrLine.txt
    console.log(gCurrLine);
    updateGmeme(gCurrMeme)
    document.querySelector('.txt-input').value = gMemeText

}

function onChangeFontSize(val) {
    var fontSize = textFont.substring(0, 2)
    var oldFontSize = fontSize
    if (val.innerText === 'A+') fontSize++
    else fontSize--
    gCurrLine.font = textFont.replace(oldFontSize, fontSize)
    textFont = gCurrLine.font
    updateGmeme(gCurrMeme)
    renderMeme()
}

function onChangeLineColor(val) {
    gCurrLine.color2 = val
    updateGmeme(gCurrMeme)
    renderMeme()
}

function onChangeInsideColor(val) {
    gCurrLine.color1 = val
    updateGmeme(gCurrMeme)
    renderMeme()
}

function onRemoveLine() {
    gCurrMeme.lines.splice(gTextIdx, 1)
    gTextIdx--
    if (gTextIdx === (-1)) gTextIdx = 0
    gCurrMeme.selectedLineIdx = gTextIdx
    gCurrLine = gCurrMeme.lines[gTextIdx]
    if (!gCurrLine) gMemeText = ''
    else gMemeText = gCurrLine.txt

    document.querySelector('.txt-input').value = gMemeText
    updateGmeme(gCurrMeme)
    renderMeme()
}

function onCreatLine() {
    gCurrMeme.lines.push(
        {
            txt: 'something',
            font: '40px arial',
            aling: 'left',
            color1: 'red',
            color2: 'black',
            pos: { lat: 250, lng: 200 }
        })
    gCurrLine = gCurrMeme.lines[gTextIdx]
    console.log(gCurrMeme);
    updateGmeme(gCurrMeme)
    onChangeLine()
    renderMeme()
}

function onKeyUp(val) {
    gMemeText = val
    gCurrMeme.lines[gTextIdx].txt = gMemeText
    updateGmeme(gCurrMeme)
    renderMeme()
}

function renderMeme() {

    const img = new Image()
    img.src = gImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gCurrMeme.lines.forEach(line => {
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
