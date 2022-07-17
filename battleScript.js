const battleImage = new Image()
battleImage.src = './Image/battleBackground.png'

const draggleImage = new Image()
draggleImage.src = './Image/draggleSprite.png'
const embyImage = new Image()
embyImage.src = './Image/embySprite.png'

const battleBackground = new Sprite({position:{
        x: 0,
        y: 0
    },
    image: battleImage
})
const draggle = new Sprite({position:{
        x: 790,
        y: 95
    },
    image: draggleImage,
    frames:{ max: 4, hold: 30},
    animation: true,
    scale: 1.1
})

const emby = new Sprite({position:{
        x: 265,
        y: 305
    },
    image: embyImage,
    frames:{ max: 4, hold: 15},
    animation: true,
    scale: 1.3
})


function animationBattle(){
    window.requestAnimationFrame(animationBattle)
    battleBackground.draw()
    draggle.draw()
    emby.draw()
}