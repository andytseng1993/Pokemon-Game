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
    isEnemy: true,
    name: 'Draggle'
})

const emby = new Sprite({position:{
        x: 265,
        y: 300
    },
    image: embyImage,
    frames:{ max: 4, hold: 15},
    animation: true,
    scale: 1,
    name: 'Emby'
})
const queue = []
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
        emby.attack({
            attack: selectedAttack,
            enemy: draggle,
            renderedSprites
        })
        queue.push(()=>{
            draggle.attack({
                attack: attacks.Tackle,
                enemy: emby,
                renderedSprites
            })
        })
    })
})
document.querySelector('#dialogueBox').addEventListener('click',(e)=>{
    if(queue.length>0) return (queue.shift())()
    e.currentTarget.style.display = 'none'
})
