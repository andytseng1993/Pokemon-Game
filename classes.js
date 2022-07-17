class Boundary{
    static width = 51 //1 Tile is 51 pexel, cause 4.25*12 
    static height = 51
    constructor({position}){
        this.position = position
        this.width = 51
        this.height = 51
    }
    draw(){
        ctx.fillStyle = 'rgba(255,0,0,0.2)'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

class Sprite{
    constructor({position,image,frames = {max : 1, hold: 10 }, sprites, animation = false, scale = 1}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0 ,elapes: 0}
        this.image.onload = ()=>{
            this.width = this.image.width/this.frames.max
            this.height = this.image.height
        }
        this.animation = animation
        this.sprites = sprites
        this.scale = scale
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val * this.width, //crop from x 
            0, //crop from y
            this.image.width/this.frames.max, // crop width 
            this.image.height,// crop height
            this.position.x, //x
            this.position.y, //y
            this.image.width/this.frames.max*this.scale, // actually width, scale rate
            this.image.height*this.scale,// actually height,scale rate
        )
        if(!this.animation) {
            this.frames.val=0
            return
        }
        if(this.frames.max>1) this.frames.elapes++
        if(this.frames.elapes % this.frames.hold === 0) this.frames.val= (++this.frames.val)% this.frames.max
    }
}