class Boundary{
    static width = 51 //1 Tile is 51 pexel, cause 4.25*12 
    static height = 51
    constructor({position}){
        this.position = position
        this.width = 51
        this.height = 51
    }
    draw(){
        // ctx.fillStyle = 'rgba(255,0,0,0.2)'
        // ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

class Sprite{
    constructor({
        position,
        image,
        frames = {max : 1, hold: 10 },
        sprites, 
        animation = false,
        scale = 1,
        rotation = 0,
        experience = 0,
        playerLv = 1
    }){
        this.position = position
        this.image = new Image()
        this.frames = {...frames, val: 0 ,elapes: 0, frame:0}
        this.image.src = image.src
        this.image.onload = ()=>{
            this.width = this.image.width/this.frames.max
            this.height = this.image.height
        }
        this.animation = animation
        this.sprites = sprites
        this.scale = scale
        this.opacity = 1
        this.rotation = rotation
        this.playerLv = playerLv
        this.experience = experience
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

}

class Monster extends Sprite{
    constructor({
        position,
        image,
        frames = {max : 1, hold: 10 },
        sprites, 
        animation = false,
        scale = 1,
        rotation = 0,
        isEnemy = false,
        name,
        attacks,
        healthBasic,
        healthPerLv,
        level = 1
    }){
        super({
            position,
            image,
            frames,
            sprites, 
            animation,
            scale,
            rotation,
        })
        this.isEnemy = isEnemy
        this.healthBasic = healthBasic
        this.healthPerLv = healthPerLv
        this.name = name
        this.attacks = attacks
        this.level = level
        this.health
        this.setHealth()
        this.fullHealth
    }
    get fullHealth(){
        this.health = this.healthBasic+ this.healthPerLv * this.level
        return this.health
    }
    setHealth(health,damage){  
        this.health =health - damage
    }
    
    attack({attack,enemy, renderedSprites}){
        // dialogueBox
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').textContent = this.name + ' used '+ attack.name + '!'
        let bear
        let rotation = 1
        let healthBar ='#enemyHealthBar'
        
        if(this.isEnemy) {
            healthBar = '#playerHealthBar'
            rotation = -2.5
        }
        enemy.setHealth(enemy.health,(attack.damage+this.level*attack.damagePerLv))
        // enemy.health -= attack.damage
        console.log(enemy.name,enemy.health);
        if(enemy.health<0) enemy.health= 0
        let healthPercent = enemy.health*100/(enemy.healthBasic+ enemy.healthPerLv * enemy.level)

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
                        audio.Hit.play()
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
                fireballImage.src = './Image/fireball.png'
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
                audio.Fireball.play()
                gsap.to(fireball.position,{
                    x: enemy.position.x,
                    y: enemy.position.y,
                    onComplete:()=>{
                        audio.Explosion.play()
                        //enemy gets hit
                        afterHit(healthBar,healthPercent,healthColor,enemy)
                        renderedSprites.splice(1,1)

                    }
                })
                break
                case 'RazorLeaf':
                    const razorLeafImage = new Image()
                    razorLeafImage.src = './Image/razorleaf.png'
                    const razorLeaf = new Sprite({
                        position:{
                            x: enemy.position.x,
                            y: enemy.position.y
                        },
                        image: razorLeafImage,
                        frames: {
                            max:8,
                            hold: 5
                        },
                        animation: true,
                        scale: 4
                    })
                    renderedSprites.splice(2,0,razorLeaf) 
                    gsap.from(razorLeaf.position,{
                        x: enemy.position.x,
                        y: enemy.position.y,
                        onComplete:()=>{
                            //enemy gets hit
                            audio.RazorLeaf.play()
                            afterHit(healthBar,healthPercent,healthColor,enemy)
                            renderedSprites.splice(2,1)
    
                        }
                    })
                    break
                    case 'RockThrow':
                        const rockThrowImage = new Image()
                        rockThrowImage.src = './Image/rockThrow.png'
                        const rockThrow = new Sprite({
                            position:{
                                x: enemy.position.x-10,
                                y: enemy.position.y-20
                            },
                            image: rockThrowImage,
                            frames: {
                                max:14,
                                hold: 4
                            },
                            animation: true,
                            scale: 4
                        })
                        renderedSprites.splice(2,0,rockThrow) 
                        gsap.from(rockThrow.position,{
                            x: enemy.position.x-10,
                            y: enemy.position.y-100,
                            duration: 0.7,
                            onComplete:()=>{
                                //enemy gets hit
                                audio.Hit.play()
                                afterHit(healthBar,healthPercent,healthColor,enemy)
                                renderedSprites.splice(2,1)
                            }
                        })
                        break
                case 'BearScratch':
                    const bearScratchImage = new Image()
                    bearScratchImage.src = './Image/bearScratch.png'
                    const bearScratch = new Sprite({
                        position:{
                            x: this.position.x,
                            y: this.position.y
                        },
                        image: bearScratchImage,
                        frames: {
                            max:4,
                            hold: 10
                        },
                        animation: true,
                        scale: 2.7
                    })
                    const clawImage = new Image()
                    clawImage.src = './Image/claw.png'
                    const claw = new Sprite({
                        position:{
                            x: enemy.position.x,
                            y: enemy.position.y
                        },
                        image: clawImage,
                        frames: {
                            max:4,
                            hold: 10
                        },
                        animation: true,
                        scale: 3.2
                    })
                    renderedSprites.splice(2,0,claw)
                    bear = renderedSprites.splice(0,1,bearScratch) 
                    gsap.from(claw.position,{
                        x: enemy.position.x,
                        y: enemy.position.y,
                        onComplete:()=>{
                            //enemy gets hit
                            audio.RazorLeaf.play()
                            afterHit(healthBar,healthPercent,healthColor,enemy)
                            renderedSprites.splice(2,1)
                            renderedSprites.splice(0,1,...bear) 
                        }
                    })
                    break
                case 'BodySlam':
                    const bodySlamImage = new Image()
                    bodySlamImage.src = './Image/bearJump.png'
                    const  bodySlam = new Sprite({
                        position:{
                            x: this.position.x,
                            y: this.position.y
                        },
                        image: bodySlamImage,
                        frames: {
                            max:5,
                            hold: 11
                        },
                        animation: true,
                        scale: 3
                    })
                    bear = renderedSprites.splice(0,1,bodySlam) 
                    gsap.to(bodySlam.position,{
                        x: this.position.x,
                        y: this.position.y-40,
                        onComplete:()=>{
                            //enemy gets hit
                            audio.Hit2.play()
                            afterHit(healthBar,healthPercent,healthColor,enemy)
                            renderedSprites.splice(0,1,...bear)
                        }
                    })
                    break
                
        }
    }
    faint(){
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').textContent = this.name + ' faint !'
        gsap.to(this.position,{
            y:this.position.y+10
        })
        gsap.to(this,{
            opacity:0,
            onComplete:()=>{
                gsap.to(this.position,{
                    y:this.position.y-10
                })  
            }
        })
    }
    levelUp(enemyMonster){
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').textContent = this.name +' gained '+ gainedExp[enemyMonster.level] +' Exp. points !'
        player.experience +=  gainedExp[enemyMonster.level]
        let i = 0
        if(player.playerLv>=15) return
        while(player.experience > playerExp[player.playerLv]){
            player.experience -=  playerExp[player.playerLv]
            player.playerLv+=1
            i++
        }
        let expPercent = player.experience/playerExp[player.playerLv]*100
        if(i>0){
            i-=1
            gsap.to('.expBar',{
                width : '100%',
                repeat: i,
                onComplete:()=>{
                    audio.LevelUp.play()
                    document.querySelector('.expBar').style.width = '0%'
                    gsap.to('.expBar',{
                        width : expPercent+'%',
                        onComplete:()=>{
                            const par = document.createElement('p')
                            par.textContent = this.name + ' grew to level '+ player.playerLv+' !' 
                            document.querySelector('#dialogueBox').append(par)
                            document.getElementById('playerLv').textContent = 'Lv'+  player.playerLv
                        }
                    })
                }
            })
            return
        }
        if(i===0){
            gsap.to('.expBar',{
                width : expPercent+'%',
            })
            return  
        }
    }
}

function afterHit(healthBar,healthPercent,healthColor,enemy){
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