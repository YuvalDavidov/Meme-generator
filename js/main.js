'use script'
let gCanvas
let gGallery
let gMemeImgs

function onInit() {
    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.remove('flex')
    gCanvas.hidden = true
    gMemeImgs = getGImgs()
    renderGallery(gMemeImgs)

    renderKeywords()
    // onMakeMeme(1)
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
    onBackToGallery()
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

function onMakeMeme(idxOfMeme, idxOfSavedMeme) {
    gCanvas = document.querySelector('.meme-editor')
    gCanvas.classList.add('flex')
    gCanvas.hidden = false

    gGallery = document.querySelector('.imgs-gallery')
    gGallery.hidden = true
    initMemeCanvas(idxOfMeme, idxOfSavedMeme)
}

function renderGallery(imgs) {
    var srtHTMLs = ''
    imgs.forEach(meme => {
        srtHTMLs += `<img onclick="onMakeMeme(${meme.id})" src="${meme.url}" class="meme-imgs">`
    })
    srtHTMLs += `<div class="add-meme-img meme-imgs flex">add meme
    <input type="file" id="image-input" onchange="onAddImg(event)" accept="image/jpg"></div>`
    document.querySelector('.grid').innerHTML = srtHTMLs
}

function filterGallery() {
    onBackToGallery()
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

function onShowSavedMemes() {
    onBackToGallery()
    var savedMems = getSavedMemes()
    if (!savedMems) return
    var strHTML = ''

    savedMems.forEach((meme, idx) => {
        strHTML += `<img onclick="onMakeMeme(${meme.selectedImgId},${idx})" src="/imgs/meme-imgs/${meme.selectedImgId}.jpg" class="meme-imgs">`
    })
    document.querySelector('.grid').innerHTML = strHTML

}

function onAddImg(ev) {
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        let newImg = { id: gMemeImgs.length + 1, url: img.src, keywords: ['me'] }
        gMemeImgs.push(newImg)
        img.onload = () => onMakeMeme(newImg.id)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}