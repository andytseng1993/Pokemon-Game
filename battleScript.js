const battleImage = new Image()
battleImage.src = './Image/battleBackground.png'

const battleBackground = new Sprite({position:{
        x: 0,
        y: 0
    },
    image: battleImage
})

let draggle,emby,renderedSprites,battleAnimationId,queue,level
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

    monsterLevel = Math.floor(Math.random()*5 +1 )
    document.getElementById('monsterLv').textContent = 'Lv'+monsterLevel

    draggle = new Monster({...monsters.Draggle ,level:monsterLevel})
    emby = new Monster({...monsters.Emby,level : 10} )
    renderedSprites = [draggle,emby]
    queue = []
    // low level 1~5
    

    // monster apeared!  
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').textContent =   'A wild draggle apeared !'

    // Fight & Run button
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
                document.getElementById('attackType').style.color = 'white'
                document.getElementById('attackType').textContent = 'Attack Type'
                document.querySelectorAll('#action button').forEach(button=>{
                    button.addEventListener('click',(e)=>{
                        console.log(e.currentTarget);
                        // player attacks
                        playerAttack(e,emby,draggle)
                        // enemy attacks
                        enemyAttack(emby,draggle)
                    })
                    //Attack Type
                    button.addEventListener('mouseenter',(e)=>{
                        const type = attacks.emby[e.currentTarget.textContent]
                        if(type.type === 'Fire') document.getElementById('attackType').style.color = 'rgb(255, 130, 101)'
                        else document.getElementById('attackType').style.color = 'white'
                        document.getElementById('attackType').textContent = type.type
                    })
                })
            }
            // choose to Run Action
            if(e.currentTarget.innerHTML==='Run'){
                let run = Math.random()
                if(run<0.4) {
                    document.querySelector('#dialogueBox').style.display = 'block'
                    document.querySelector('#dialogueBox').textContent =   ' You got away safely !'
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
                }
                else{
                    document.querySelector('#dialogueBox').style.display = 'block'
                    document.querySelector('#dialogueBox').textContent =   ' You failed to get away !'
                    enemyAttack(emby,draggle)
                }
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

document.querySelector('#dialogueBox').addEventListener('click',(e)=>{
    if(queue.length>0) (queue.shift())()
    else e.currentTarget.style.display = 'none'
    document.getElementById('attackType').style.color = 'white'
})

// player attacks
function playerAttack(e,player,enemyMonster){
    const selectedAttack = attacks.emby[e.currentTarget.textContent]
    player.attack({
        attack: selectedAttack,
        enemy: enemyMonster,
        renderedSprites
    })
    // draggle death
    checkHealth(enemyMonster)
}

// Enemy attacks
function enemyAttack(player,enemyMonster){
    const randomAttack = enemyMonster.attacks[Math.floor(Math.random()* enemyMonster.attacks.length)]
    queue.push(()=>{
        enemyMonster.attack({
            attack: randomAttack,
            enemy: player,
            renderedSprites
        })
        // emby death
        checkHealth(player)
    })
}
// Check target health
function checkHealth(target){
    if(target.health <= 0){
        queue.push(()=>{
            target.faint()
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
}