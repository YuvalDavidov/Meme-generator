'use script'

let gElCanvas
let gCtx
let gCurrMeme
let gImg
let gTextIdx
let gCurrLine

let gMemeText
let memeId

let insideColor
let textFont

function initMemeCanvas(idxOfMeme, idxOfSavedMeme) {
    var savedMemes = getSavedMemes()
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    gImg = getImg(idxOfMeme)
    memeId = gImg.id
    if (idxOfSavedMeme === undefined) gCurrMeme = getGMeme()
    else gCurrMeme = savedMemes[idxOfSavedMeme]
    updateCurrMeme(gCurrMeme)
    renderCanvas()
    renderMeme()
    // addEventListener()
}

function updateCurrMeme(currMeme) {
    currMeme.selectedImgId = memeId
    gTextIdx = currMeme.selectedLineIdx
    gCurrLine = currMeme.lines[gTextIdx]
    gMemeText = gCurrLine.txt
    textFont = gCurrLine.font

    document.querySelector('.txt-input').value = gMemeText
}

function renderCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
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

function addEventListener() {
    addMouseListeners()
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos);
    var line = gCurrMeme.lines[0]
    drawText(line.txt, pos.lat, pos.lng, line.color1, line.color2, line.font)
}

function getEvPos(ev) {
    let pos = {
        lat: ev.offsetX,
        lng: ev.offsetY
    }
    return pos
}

function onMoveLine(el) {
    if (el.innerText === '↑') gCurrLine.pos.lng -= 10
    else if (el.innerText === '↓') gCurrLine.pos.lng += 10
    else if (el.innerText === '←') gCurrLine.pos.lat -= 10
    else gCurrLine.pos.lat += 10

    updateGmeme(gCurrMeme)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onChangeLine() {
    if (gCurrMeme.lines.length === 0) return
    else if (gCurrMeme.lines.length === 1) document.querySelector('.txt-input').value = gMemeText
    else if (gTextIdx === gCurrMeme.lines.length - 1 && gTextIdx !== 0) {
        gTextIdx = 0
    } else gTextIdx++
    gCurrMeme.selectedLineIdx = gTextIdx
    gCurrLine = gCurrMeme.lines[gTextIdx]
    gMemeText = gCurrLine.txt

    updateGmeme(gCurrMeme)
    document.querySelector('.txt-input').value = gMemeText

}

function onChangeFontSize(val) {
    console.log(textFont);
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
    CreatLine()
    onChangeLine()
    renderMeme()
}

function onKeyUp(val) {
    gMemeText = val
    gCurrMeme.lines[gTextIdx].txt = gMemeText
    updateGmeme(gCurrMeme)
    renderMeme()
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

function onDownloadImg(elLink) {
    let isDownload = confirm('do you want to download this meme?')
    if (isDownload) {
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
    }
}

function onSaveMeme() {
    saveMeme()
}

function onUploadCanvas() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}