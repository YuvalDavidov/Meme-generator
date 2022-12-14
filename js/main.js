'use script'
var gCanvas
var gGallery

function onInit() {

    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.remove('flex')
    gCanvas.hidden = true
    renderGallery()
    onMakeMeme(1)
}

function onBackToGallery() {
    if (!gCanvas.hidden) {
        gCanvas = document.querySelector('.meme-editor')
        gCanvas.classList.remove('flex')
        gCanvas.hidden = true


        gGallery = document.querySelector('.imgs-gallery')
        gGallery.hidden = false
    }
}

function onMakeMeme(idxOfMeme) {
    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.add('flex')
    gCanvas.hidden = false
    // console.log(idxOfMeme);
    initMemeCanvas(idxOfMeme)

    gGallery = document.querySelector('.imgs-gallery')
    gGallery.hidden = true
}

function renderGallery() {
    // <div onclick="onMakeMeme(0)" class="meme-imgs img1"></div>
    var srtHTMLs = ''
    var memeImgs = getGImgs()
    memeImgs.forEach(meme => {
        srtHTMLs += `<div onclick="onMakeMeme(${meme.id})" class="meme-imgs img${meme.id}"></div>`
    })
    document.querySelector('.grid').innerHTML += srtHTMLs
}