const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)

const image = new Image()
image.src = './Image/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './Image/playerDown.png'

class Sprite{
    constructor({position,image}){
        this.position = position
        this.image = image
    }
    draw(){
        ctx.drawImage(this.image, this.position.x,this.position.y)
    }
}

const background = new Sprite({
    position:{
        x: -1425,
        y: -490
    },
    image
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

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    ctx.drawImage(
        playerImage,
        0, //crop from x 
        0, //crop from y
        playerImage.width/4, // crop width 
        playerImage.height,// crop height
        canvas.width/2- playerImage.width/8, //x
        canvas.height/2 - playerImage.height/2, //y
        playerImage.width/4, // actually width, scale rate
        playerImage.height,// actually height,scale rate
    )
    if(keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if(keys.a.pressed && lastKey === 'a') background.position.x += 3
    else if(keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if(keys.d.pressed && lastKey === 'd') background.position.x -= 3
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