'use script'
var gCanvas
var gGallery
var gMemeImgs

function onInit() {
    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.remove('flex')
    gCanvas.hidden = true
    gMemeImgs = getGImgs()
    renderGallery(gMemeImgs)

    renderKeywords()
    onMakeMeme(1)
}

function renderKeywords() {
    var gKeywords = creatKeywordsArray()
    const keywordsContainer = document.querySelector('.key-words')
    var strHTML = ''

    gKeywords.forEach(key => {
        strHTML += `<div onclick="filterGalleryByKeyword(this)" class="key-word">${key}</div>`
    })

    keywordsContainer.innerHTML = strHTML
}

function filterGalleryByKeyword(el) {
    const text = el.innerText

    var newGalleryMemes = gMemeImgs.filter(img => {
        var id
        img.keywords.find(key => {
            if (text === key) return id = img.id
        })
        return img.id === id

    })
    renderGallery(newGalleryMemes)
}

function onBackToGallery() {
    if (!gCanvas.hidden) {
        gCanvas = document.querySelector('.meme-editor')
        gCanvas.classList.remove('flex')
        gCanvas.hidden = true


        gGallery = document.querySelector('.imgs-gallery')
        gGallery.hidden = false
    }
    renderGallery(gMemeImgs)
}

function onNextKeyword() {
    nextKeyword()
    renderKeywords()
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

function renderGallery(imgs) {
    var srtHTMLs = ''
    imgs.forEach(meme => {
        srtHTMLs += `<img onclick="onMakeMeme(${meme.id})" src="/imgs/meme-imgs/${meme.id}.jpg" class="meme-imgs">`
    })
    document.querySelector('.grid').innerHTML = srtHTMLs
}

function filterGallery() {
    const text = document.getElementById('gallery-filter').value

    var newGalleryMemes = gMemeImgs.filter(img => {
        var id
        img.keywords.find(key => {
            if (text === key) return id = img.id
        })
        return img.id === id

    })

    if (!newGalleryMemes.length) {
        alert(`we dont have ${text} in our meme gallery`)
        return renderGallery(gMemeImgs)
    }
    else renderGallery(newGalleryMemes)

}