'use script'
var gCanvas
var gGallery

function onInit() {
    creatMemes()
    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.remove('flex')
    gCanvas.hidden = true
    renderGallery()
}

function onMakeMeme(idxOfMeme) {
    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.add('flex')
    gCanvas.hidden = false


    initMemeCanvas(idxOfMeme)
    gGallery = document.querySelector('.imgs-gallery')
    gGallery.hidden = true
}

function renderGallery() {
    // <div onclick="onMakeMeme(0)" class="meme-imgs img1"></div>
    var srtHTMLs = ''
    var count = 0
    var memes = getGMemes()
    memes.forEach(meme => {
        srtHTMLs += `<div onclick="onMakeMeme(${count})" class="meme-imgs img${count + 1}"></div>`
        count++
    })
    console.log(srtHTMLs);
    document.querySelector('.grid').innerHTML += srtHTMLs
}