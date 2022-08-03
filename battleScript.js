const battleImage = new Image()
battleImage.src = './Image/battleBackground.png'

const battleBackground = new Sprite({position:{
        x: 0,
        y: 0
    },
    image: battleImage
})

let draggle,emby,renderedSprites,battleAnimationId,queue,level,enemy,giantFrog,giantRacoon,monsterLevel
const actions = ['Fight','Run']


function initBattle(battleLevel){
    document.getElementById('battle').style.display = 'none'
    document.getElementById('userInterface').style.display = 'block'
    document.getElementById('action').replaceChildren()
    document.getElementById('attackType').replaceChildren()
    document.getElementById('playerHealthBar').style.width = '100%'
    document.getElementById('playerHealthBar').style.backgroundColor = 'rgb(84, 255, 150)'
    document.getElementById('enemyHealthBar').style.width = '100%'
    document.getElementById('enemyHealthBar').style.backgroundColor = 'rgb(84, 255, 150)'
    
    // different moster level
    emby = new Monster({...monsters.Emby, level: player.playerLv})
    renderedSprites = [emby]
    queue = []
    
    switch (battleLevel) {
        case 'mid':
            monsterLevel=Math.floor(Math.random()*5 +6 )
            if(Math.random()>0.4){
                giantFrog = new Monster({...monsters.GiantFrog ,level:monsterLevel})
                renderedSprites.unshift(giantFrog)
            }
            else{
                draggle = new Monster({...monsters.Draggle ,level:monsterLevel})
                renderedSprites.unshift(draggle)
            }
            audio.MidBattle.play()
            break;
        case 'high':
            monsterLevel=Math.floor(Math.random()*5 +11 )
            if(Math.random()>0.4){
                demon = new Monster({...monsters.Demon ,level:monsterLevel})
                renderedSprites.unshift(demon)
            }
            else {
                giantFrog = new Monster({...monsters.GiantFrog ,level:monsterLevel})
                renderedSprites.unshift(giantFrog)
            }
            audio.HighBattle.play()
            break;
        case 'boss':
            monsterLevel=Math.floor(Math.random()*5 +15 )
            if(Math.random()>0.4){
                giantRacoon = new Monster({...monsters.GiantRacoon ,level:monsterLevel})
                renderedSprites.unshift(giantRacoon)
            }
            else {
                demon = new Monster({...monsters.Demon ,level:monsterLevel})
                renderedSprites.unshift(demon)
            }
            audio.FinalArea.play()
            break;
        default:
            monsterLevel=Math.floor(Math.random()*3 +1 )
            draggle = new Monster({...monsters.Draggle ,level:monsterLevel})
            renderedSprites.unshift(draggle)
            audio.Fight.play()
            break;
    }

    document.getElementById('monsterName').textContent = renderedSprites[0].name
    document.getElementById('monsterLv').textContent = 'Lv'+monsterLevel
    document.getElementById('playerLv').textContent = 'Lv'+ emby.level

    // monster apeared!  
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').textContent =   'A wild '+renderedSprites[0].name+' apeared !'

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
        button.addEventListener('mouseenter',()=>{
            audio.Menu.play()
        })
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
                        // player attacks
                        playerAttack(e,emby,renderedSprites[0])
                        // enemy attacks
                        enemyAttack(emby,renderedSprites[0])
                    })
                    //Attack Type
                    button.addEventListener('mouseenter',(e)=>{
                        audio.Menu.play()
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
                if(run<0.6) {
                    document.querySelector('#dialogueBox').style.display = 'block'
                    document.querySelector('#dialogueBox').textContent =   ' You got away safely !'
                    queue.push(()=>{
                        audio.RunAway.play()
                        gsap.to(emby.position,{ 
                            x:emby.position.x-40,
                            duration:0.2,
                            onComplete:()=>{
                                gsap.to(emby.position,{
                                    x:emby.position.x+40,
                                    delay: 0.5,
                                })
                            }
                        })
                        gsap.to(emby,{
                            opacity:0,
                            duration: 0.5,
                        })
                        gsap.to('#battle',{
                            opacity: 1,
                            zIndex: 15,
                            onComplete:()=>{
                                audio.Fight.stop()
                                audio.MidBattle.stop()
                                audio.HighBattle.stop()
                                audio.FinalArea.stop()
                                audio.Map.play()
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
                    audio.RunFailed.play()
                    document.querySelector('#dialogueBox').style.display = 'block'
                    document.querySelector('#dialogueBox').textContent =   ' You failed to run away !'
                    enemyAttack(emby,renderedSprites[0])
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
    if(enemyMonster.health <= 0){
        queue.push(()=>{
            enemyMonster.faint()
            audio.Success.play()
        })
        queue.push(()=>{
            console.log(enemyMonster);
            player.levelUp(enemyMonster)
        })
        backToMap()
        return
    }
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
        if(player.health <= 0){
            queue.push(()=>{
                player.faint()
                audio.GameOver.play()
            })
            backToMap()
            return
        }
    })
}
// Back to Map
function backToMap(){
    queue.push(()=>{
        gsap.to('#battle',{
            opacity: 1,
            zIndex: 15,
            onComplete:()=>{
                cancelAnimationFrame(battleAnimationId)
                document.querySelector('#userInterface').style.display = 'none'
                document.querySelector('#dialogueBox').style.display = 'none'
                animate()
                audio.Fight.stop()
                audio.MidBattle.stop()
                audio.HighBattle.stop()
                audio.FinalArea.stop()
                audio.Map.play()
                gsap.to('#battle',{
                    opacity: 0
                })
                battle.initiated = false
            }
        })
    })
}