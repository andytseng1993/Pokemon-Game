const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)

const image = new Image()
image.src = './Image/Pellet Town.png'

image.onload = ()=>{
    ctx.drawImage(image,-1400,-400)
}


