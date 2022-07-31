const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

audio.Map.once('unlock', function() {
    audio.Map.play();
});

/* collisions */
function jsonData(data,arrayMap){
    //weidth = 70 tiles, height = 40titles
    for(let i = 0; i <data.length ; i += 70){
        arrayMap.push(data.slice(i,i+70))
    }
}
const collisionsMap = []
// for(let i = 0; i <collisions.length ; i += 70){
//     collisionsMap.push(collisions.slice(i,i+70))
// }
jsonData(collisions,collisionsMap)

/* Battle Zones */
const lowBattleZonesMap = []
jsonData(lowBattleZonesData,lowBattleZonesMap)

const midBattleZonesMap = []
jsonData(midBattleZonesData,midBattleZonesMap)

const highBattleZonesMap = []
jsonData(highBattleZonesData,highBattleZonesMap)

const bossBattleZonesMap = []
jsonData(bossBattleZonesData,bossBattleZonesMap)


const offset={
    x: -1425,
    y: -520
}
/* Collision Area Array */
function area(arrayMap,positionArray){
    arrayMap.forEach((row, i)=>{
        row.forEach((tile, j) =>{
            if(tile === 1025 ){
                positionArray.push(
                    new Boundary ({
                        position:{
                            x: j*Boundary.width + offset.x,
                            y: i*Boundary.height+ offset.y
                        }
                    })
                ) 
            }
        })
    })
}
/* Collision Area Array */
const boundaries = []
area(collisionsMap,boundaries)


/* Battle Zones Area Array */
const lowBattleZones = []
area(lowBattleZonesMap,lowBattleZones)

const midBattleZones = []
area(midBattleZonesMap,midBattleZones)

const highBattleZones = []
area(highBattleZonesMap,highBattleZones)

const bossBattleZones = []
area(bossBattleZonesMap,bossBattleZones)

const image = new Image()
image.src = './Image/Pellet Town.png'

const playerUpImage = new Image()
playerUpImage.src = './Image/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './Image/playerLeft.png'

const playerDownImage = new Image()
playerDownImage.src = './Image/playerDown.png'

const playerRightImage = new Image()
playerRightImage.src = './Image/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = './Image/Foreground.png'


const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image
})

const player =  new Sprite({
    position:{
        x : canvas.width/2- 192/8 ,
        y : canvas.height/2 - 68/2
    },
    image: playerDownImage,
    frames: {max: 4, hold: 10},
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage
    }
})

const foreground =  new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage

})

const keys = {
    w:{
        pressed : false
    },
    a:{
        pressed : false
    },
    s:{
        pressed : false
    },
    d:{
        pressed : false
    },
}

const movables = [background,...boundaries,foreground,...lowBattleZones,...midBattleZones,...highBattleZones,...bossBattleZones] //all movable objects

function rectangularCollision({rectangle1,rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x+rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y + rectangle1.height/2<= rectangle2.position.y+rectangle2.height
    )
}
const battle = {
    initiated : false
}


function animate(){
    
    const animationId = window.requestAnimationFrame(animate)
    background.draw()
    player.draw()
    foreground.draw()

    if(player.animation){
         player.animation = false
    }
    let moving = true

    if(battle.initiated) return
    /* detect in Battle Zones */
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){

        /* detect in low level Battle Zones */
        battleZone(lowBattleZones,animationId)
        
        /* detect in mid level Battle Zones */
        battleZone(midBattleZones,animationId,'mid')
        
        /* detect in high level Battle Zones */
        battleZone(highBattleZones,animationId,'high')
        
        /* detect in boss level Battle Zones */
        battleZone(bossBattleZones,animationId,'boss')
    }
    

    if(keys.w.pressed && lastKey === 'w') {
        player.image = player.sprites.up
        player.animation = true
        for(let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })){
                moving = false
                break
            }
        }
        if (moving){
            movables.forEach(movable=>{
                movable.position.y += 3
            })
        }
    }
    else if(keys.a.pressed && lastKey === 'a') {
        player.image = player.sprites.left
        player.animation = true
        for(let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x + 2 ,
                        y: boundary.position.y
                    }
                }
            })){
                moving = false
                break
            }
        }
        if (moving){
            movables.forEach(movable=>{
                movable.position.x += 3
            })
        }
    }
    else if(keys.s.pressed && lastKey === 's') {
        player.image = player.sprites.down
        player.animation = true
        for(let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })){
                moving = false
                break
            }
        }
        if (moving){
            movables.forEach(movable=>{
                movable.position.y -= 3
            })
        }
    }
    else if(keys.d.pressed && lastKey === 'd') {
        player.image = player.sprites.right
        player.animation = true
        for(let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x - 2,
                        y: boundary.position.y
                    }
                }})){
                moving = false
                break
            }
        }
        if (moving){
            movables.forEach(movable=>{
                movable.position.x -= 3
            })
        }
    }
    
}
   
// animate()
initBattle()
animationBattle()

window.addEventListener('keydown',(e)=>{
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})
let lastKey = ''
window.addEventListener('keyup',(e)=>{
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

function battleZone(BattleZones,animationId,zoneName){
    for(let i =0; i < BattleZones.length; i++){
            const battleZone = BattleZones[i]
            const overlappingArea = 
                (Math.min(battleZone.position.x+battleZone.width, player.position.x+player.width)-
                Math.max(battleZone.position.x, player.position.x)) * 
                (Math.min(battleZone.position.y+battleZone.height, player.position.y+player.height)-
                Math.max(battleZone.position.y, player.position.y))
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: battleZone
            })  && overlappingArea > (player.width*player.height)/2 
                && Math.random() <0.02
            ){
                /* cancel animation loop */
                window.cancelAnimationFrame(animationId)
                battle.initiated = true
                audio.Map.stop()
                audio.InitBattle.play()
                document.getElementById('battle').style.display = 'block'
                gsap.to('#battle',{
                    opacity:1,
                    repeat:3,
                    yoyo:true,
                    duration: 0.3,
                    onComplete(){
                        gsap.to('#battle',{
                            opacity:1,
                            duration: 0.4,
                            onComplete(){
                                /* activate a new animation loop */
                                initBattle(zoneName)
                                animationBattle()
                                gsap.to('#battle',{
                                    opacity:0,
                                    duration: 0.4,
                                })
                            }
                        })
                    }
                })
                break
            }
        }
}