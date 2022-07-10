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
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

const bounduries = []
collisionsMap.forEach((row, i)=>{
    row.forEach((tile, j) =>{
        if(tile === 1025 ){
            bounduries.push(
                new Boundary ({
                    position:{
                        x: j*Boundary.width,
                        y: i*Boundary.height
                    }
                })
            ) 
        }
    })
})

console.log(bounduries);
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