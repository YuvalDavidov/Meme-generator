'use script'
let gElCanvas
let gCtx
let currMeme
let gCurrMemeText
let memeId

function initMemeCanvas(idxOfMeme) {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    currMeme = getGMeme(idxOfMeme)
    memeId = currMeme.selectedImgId
    gCurrMemeText = currMeme.lines[0].text

    renderCanvas()
    renderMeme()
}

function onGetKey(val) {
    gCurrMemeText = val
    setLineTxt(gCurrMemeText, memeId)
    renderMeme()

}

function renderMeme() {
    const img = new Image()
    const gImg = currMeme.Img
    img.src = gImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gCurrMemeText, 250, 100)
    }

}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = "40px arial";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function renderCanvas() {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
