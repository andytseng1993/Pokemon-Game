const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


/* collisions */
const collisionsMap = []
//weidth = 70 tiles, height = 40titles
for(let i = 0; i <collisions.length ; i += 70){
    collisionsMap.push(collisions.slice(i,i+70))
}
console.log(collisionsMap);
class Boundary{
    static width = 51 //1 Tile is 51 pexel, cause 4.25*12 
    static height = 51
    constructor({position}){
        this.position = position
        this.width = 51
        this.height = 51
    }
    draw(){
        ctx.fillStyle = 'Red'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

const offset={
    x: -1425,
    y: -520
}

const boundaries = []
collisionsMap.forEach((row, i)=>{
    row.forEach((tile, j) =>{
        if(tile === 1025 ){
            boundaries.push(
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

console.log(boundaries);
const image = new Image()
image.src = './Image/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './Image/playerDown.png'

const foregroundImage = new Image()
foregroundImage.src = './Image/Foreground.png'
class Sprite{
    constructor({position,image,frames = {max : 1} }){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = ()=>{
            this.width = this.image.width/this.frames.max
            this.height = this.image.height
        }
        
    }
    draw(){
        ctx.drawImage(
            this.image,
            0, //crop from x 
            0, //crop from y
            this.image.width/this.frames.max, // crop width 
            this.image.height,// crop height
            this.position.x, //x
            this.position.y, //y
            this.image.width/this.frames.max, // actually width, scale rate
            this.image.height,// actually height,scale rate
        )
    }
}

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
    image: playerImage,
    frames: {max: 4}
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

const movables = [background,...boundaries,foreground] //all movable objects

function rectangularCollision({rectangle1,rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x+rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y+rectangle2.height
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary =>{
        boundary.draw()
    })
    
    player.draw()
    foreground.draw()
    
    let moving = true
    if(keys.w.pressed && lastKey === 'w') {
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
                }
            })){
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
   
animate()

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