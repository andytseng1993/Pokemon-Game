const battleImage = new Image()
battleImage.src = './Image/battleBackground.png'

const battleBackground = new Sprite({position:{
        x: 0,
        y: 0
    },
    image: battleImage
})

let draggle,emby,renderedSprites,battleAnimationId,queue
const actions = ['Fight','Run']

function initBattle(){
    document.getElementById('battle').style.display = 'none'
    document.getElementById('userInterface').style.display = 'block'
    document.getElementById('action').replaceChildren()
    document.getElementById('attackType').replaceChildren()
    document.getElementById('playerHealthBar').style.width = '100%'
    document.getElementById('playerHealthBar').style.backgroundColor = 'rgb(84, 255, 150)'
    document.getElementById('enemyHealthBar').style.width = '100%'
    document.getElementById('enemyHealthBar').style.backgroundColor = 'rgb(84, 255, 150)'

    draggle = new Monster(monsters.Draggle)
    emby = new Monster(monsters.Emby)
    renderedSprites = [draggle,emby]
    queue = []
    // Fight& Run button
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
                document.getElementById('action').textContent = ''
                emby.attacks.forEach(attack =>{
                    const button = document.createElement('button')
                    button.textContent = attack.name
                    document.getElementById('action').append(button)
                })
                document.getElementById('attackType').textContent = 'Attack Type'
                document.querySelectorAll('#action button').forEach(button=>{
                    button.addEventListener('click',(e)=>{
                        const selectedAttack = attacks.Emby[e.currentTarget.textContent]
                        console.log(selectedAttack);
                        emby.attack({
                            attack: selectedAttack,
                            enemy: draggle,
                            renderedSprites
                        })
                        // draggle death
                        if(draggle.health <= 0){
                            queue.push(()=>{
                                draggle.faint()
                            })
                            queue.push(()=>{
                                gsap.to('#battle',{
                                    opacity: 1,
                                    zIndex: 15,
                                    onComplete:()=>{
                                        cancelAnimationFrame(battleAnimationId)
                                        document.querySelector('#userInterface').style.display = 'none'
                                        document.querySelector('#dialogueBox').style.display = 'none'
                                        animate()
                                        gsap.to('#battle',{
                                            opacity: 0
                                        })
                                        battle.initiated = false
                                    }
                                })
                            })
                            return
                        }
                        // enemy attacks
                        const randomAttack = draggle.attacks[Math.floor(Math.random()* draggle.attacks.length)]
                        queue.push(()=>{
                            draggle.attack({
                                attack: randomAttack,
                                enemy: emby,
                                renderedSprites
                            })
                            // emby death
                            if(emby.health <= 1){
                                console.log('111');
                                queue.push(()=>{
                                    emby.faint()
                                })
                                queue.push(()=>{
                                    gsap.to('#battle',{
                                        opacity: 1,
                                        zIndex: 15,
                                        onComplete:()=>{
                                            cancelAnimationFrame(battleAnimationId)
                                            document.querySelector('#userInterface').style.display = 'none'
                                            document.querySelector('#dialogueBox').style.display = 'none'
                                            animate()
                                            gsap.to('#battle',{
                                                opacity: 0
                                            })
                                            battle.initiated = false
                                        }
                                    })
                                })
                                return
                            }
                        })
                    })
                    //Attack Type
                    button.addEventListener('mouseenter',(e)=>{
                        const type = attacks.Emby[e.currentTarget.textContent]
                        if(type.type === 'Fire') document.getElementById('attackType').style.color = 'rgb(255, 130, 101)'
                        else document.getElementById('attackType').style.color = 'white'
                        document.getElementById('attackType').textContent = type.type
                    })
                })
                document.querySelector('#dialogueBox').addEventListener('click',(e)=>{
                    if(queue.length>0) return (queue.shift())()
                    e.currentTarget.style.display = 'none'
                    document.getElementById('attackType').textContent = 'Attack Type'
                    document.getElementById('attackType').style.color = 'white'
                })
            }
            // choose to Run Action
            if(e.currentTarget.innerHTML==='Run'){
                console.log('Run');
            }
        })
    })
}

function animationBattle(){
    battleAnimationId = window.requestAnimationFrame(animationBattle)
    battleBackground.draw()
    renderedSprites.forEach(sprite =>{
        sprite.draw()
    })
}

