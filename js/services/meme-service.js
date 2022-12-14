'use script'

var gMemes = []

function creatMemes() {

    for (var i = 1; i < 18; i++) {
        var meme = {
            selectedImgId: i,
            selectedLineIdx: 0,
            lines: [
                {
                    text: 'I sometimes eat falafel',
                    size: 20,
                    aling: 'left',
                    color: 'red'
                }
            ],
            Img: {
                id: i,
                url: `imgs/meme-imgs/${i}.jpg`,
                keywords: ['funny', 'trump']
            }
        }
        gMemes.push(meme)
    }
}

function creatMemeLine(idxOfMeme) {
    return gMemes[idxOfMeme].lines.push(
        {
            text: 'something',
            size: 20,
            aling: 'left',
            color: 'red'
        })
}

function setLineTxt(memeText, id) {
    gMemes[id].lines[0].text = memeText
}

function getGMemes() {
    return gMemes
}

function getGMeme(idxOfMeme) {
    return gMemes[idxOfMeme]
}
