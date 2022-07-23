const draggleImage = new Image()
draggleImage.src = './../Image/draggleSprite.png'
const embyImage = new Image()
embyImage.src = './../Image/embySprite.png'

const monsters = {
    Emby:{
        position:{
            x: 265,
            y: 300
        },
        image: embyImage,
        frames:{ max: 4, hold: 15},
        animation: true,
        scale: 1,
        name: 'Emby',
        attacks:[attacks.Emby.Tackle, attacks.Emby.Fireball,attacks.Emby.Kick]
    },
    Draggle:{
        position:{
            x: 790,
            y: 95
        },
        image: draggleImage,
        frames:{ max: 4, hold: 30},
        animation: true,
        scale: 1,
        isEnemy: true,
        name: 'Draggle',
        attacks:[attacks.Draggle.Tackle,attacks.Draggle.Fireball]
    },
    
}

