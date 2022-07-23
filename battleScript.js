const battleImage = new Image()
battleImage.src = './Image/battleBackground.png'

const battleBackground = new Sprite({position:{
        x: 0,
        y: 0
    },
    image: battleImage
})
const draggle = new Monster(monsters.Draggle)
const emby = new Monster(monsters.Emby)

const queue = []
const renderedSprites = [draggle,emby]
function animationBattle(){
    window.requestAnimationFrame(animationBattle)
    battleBackground.draw()
    renderedSprites.forEach(sprite =>{
        sprite.draw()
    })
}
// Fight& Run button
const actions = ['Fight','Run']
actions.forEach( action=>{
    const button = document.createElement('button')
    button.textContent = action
    document.querySelector('#attackType').append(button)
})
const par = document.createElement('p')
par.textContent = 'What will Emby do ?'
document.getElementById('action').append(par)

document.querySelectorAll('#attackType button').forEach(button=>{
    button.addEventListener('click',(e)=>{
        // Fight Action
        if(e.currentTarget.innerHTML==='Fight'){
            document.getElementById('action').innerHTML = ''
            emby.attacks.forEach(attack =>{
                const button = document.createElement('button')
                button.textContent = attack.name
                document.getElementById('action').append(button)
            })
            document.getElementById('attackType').innerHTML = ''
            document.querySelectorAll('#action button').forEach(button=>{
                button.addEventListener('click',(e)=>{
                    const selectedAttack = attacks.Emby[e.currentTarget.innerHTML]
                    console.log(attacks);
                    emby.attack({
                        attack: selectedAttack,
                        enemy: draggle,
                        renderedSprites
                    })
                    const randomAttack = draggle.attacks[Math.floor(Math.random()* draggle.attacks.length)]
                    queue.push(()=>{
                        draggle.attack({
                            attack: randomAttack,
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
        }
        // Run Action
        if(e.currentTarget.innerHTML==='Run'){
            console.log('Run');
        }
    })
})


// emby.attacks.forEach(attack =>{
//     const button = document.createElement('button')
//     button.textContent = attack.name
//     document.getElementById('action').append(button)
// })

// document.querySelectorAll('#action button').forEach(button=>{
//     button.addEventListener('click',(e)=>{
//         const selectedAttack = attacks[e.currentTarget.innerHTML]
//         console.log(attacks);
//         emby.attack({
//             attack: selectedAttack,
//             enemy: draggle,
//             renderedSprites
//         })
//         queue.push(()=>{
//             draggle.attack({
//                 attack: attacks.Tackle,
//                 enemy: emby,
//                 renderedSprites
//             })
//         })
//     })
// })
// document.querySelector('#dialogueBox').addEventListener('click',(e)=>{
//     if(queue.length>0) return (queue.shift())()
//     e.currentTarget.style.display = 'none'
// })
