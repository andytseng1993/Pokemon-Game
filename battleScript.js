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
    scale: 1,
    isEnemy: true
})

const emby = new Sprite({position:{
        x: 265,
        y: 300
    },
    image: embyImage,
    frames:{ max: 4, hold: 15},
    animation: true,
    scale: 1
})

const renderedSprites = [draggle,emby]
function animationBattle(){
    window.requestAnimationFrame(animationBattle)
    battleBackground.draw()
    renderedSprites.forEach(sprite =>{
        sprite.draw()
    })
}

document.querySelectorAll('button').forEach(button=>{
    button.addEventListener('click',(e)=>{
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        console.log(attacks);
        draggle.attack({
            attack: selectedAttack,
            enemy: emby,
            renderedSprites
        })
    })
})
