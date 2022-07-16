const battleImage = new Image()
battleImage.src = './Image/battleBackground.png'
const battleBackground = new Sprite({position:{
        x: 0,
        y: 0
    },
    image: battleImage
})

function animationBattle(){
    window.requestAnimationFrame(animationBattle)
    battleBackground.draw()
}