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

image.onload = ()=>{
    ctx.drawImage(image,-1425,-490)
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
}
