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
    constructor({position,image,frames = {max : 1, hold: 10 }, sprites, animation = false, scale = 1,isEnemy = false,rotation = 0}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0 ,elapes: 0, frame:0}
        this.image.onload = ()=>{
            this.width = this.image.width/this.frames.max
            this.height = this.image.height
        }
        this.animation = animation
        this.sprites = sprites
        this.scale = scale
        this.opacity = 1
        this.fullHealth = 100
        this.health = 100
        this.isEnemy = isEnemy
        this.rotation = rotation
    }
    draw(){
        ctx.save()
        ctx.globalAlpha = this.opacity
        if(this.rotation!=0){
            ctx.translate(this.position.x+this.width/2, this.position.y+this.height/2)
            ctx.rotate(this.rotation)
            ctx.translate(-this.position.x-this.width/2, -this.position.y-this.height/2)
        }
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
        ctx.restore()
       
        if(!this.animation) {
            this.frames.val=0
            return
        }
        if(this.frames.max>1) this.frames.elapes++
        if(this.frames.elapes % this.frames.hold === 0) this.frames.val= (++this.frames.val)% this.frames.max
    }
    attack({attack,enemy, renderedSprites}){
        let rotation = 1
        let healthBar ='#enemyHealthBar'
        
            if(this.isEnemy) {
                healthBar = '#playerHealthBar'
                rotation = -2.5
            }
        this.health -= attack.damage
        let healthPercent = this.health*100/this.fullHealth

        let healthColor = 'rgb(84, 255, 150)'
        if(healthPercent<= 20) healthColor = 'rgb(253, 68, 12)'
        if(healthPercent> 20 && healthPercent<= 50) healthColor ='rgb(255, 239, 18)'
        

        switch(attack.name){
            case 'Tackle':
                const tl = gsap.timeline()
                let movementDistance = 20
                if(this.isEnemy) {
                    movementDistance = -20
                }
                tl.to(this.position,{x:this.position.x-movementDistance,duration:0.5})
                .to(this.position,{
                    x:this.position.x+movementDistance*2,
                    duration:0.1,
                    onComplete:()=>{
                        //enemy gets hit
                        gsap.to(healthBar,{
                            width: healthPercent +'%',
                            backgroundColor: healthColor
                        })
                        gsap.to(enemy.position,{x:enemy.position.x+10,
                            duration:0.05,
                            yoyo:true,
                            repeat:3,
                        })
                        gsap.to(enemy,{
                            opacity:0,
                            repeat:5,
                            yoyo: true,
                            duration: 0.08
                        })
                    } 
                })
                .to(this.position,{x:this.position.x})
                break
            case 'Fireball':
                const fireballImage = new Image()
                fireballImage.src = './image/fireball.png'
                const fireball = new Sprite({
                    position:{
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max:4,
                        hold: 10
                    },
                    animation: true,
                    rotation
                })
                renderedSprites.splice(1,0,fireball)
                gsap.to(fireball.position,{
                    x: enemy.position.x,
                    y: enemy.position.y,
                    onComplete:()=>{
                        //enemy gets hit
                        gsap.to(healthBar,{
                            width: healthPercent +'%',
                            backgroundColor: healthColor
                        })
                        gsap.to(enemy.position,{x:enemy.position.x+10,
                            duration:0.05,
                            yoyo:true,
                            repeat:3,
                        })
                        gsap.to(enemy,{
                            opacity:0,
                            repeat:5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1,1)

                    }
                })
                break
        }
        
    }
}