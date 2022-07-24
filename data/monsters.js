
const monsters = {
    Emby:{
        position:{
            x: 265,
            y: 300
        },
        image: {
            src: './../Image/embySprite.png'
        },
        frames:{ max: 4, hold: 15},
        animation: true,
        scale: 1.3,
        name: 'Emby',
        attacks:[attacks.Emby.Tackle, attacks.Emby.Fireball]
    },
    Draggle:{
        position:{
            x: 790,
            y: 95
        },
        image: {
            src: './../Image/draggleSprite.png'
        },
        frames:{ max: 4, hold: 30},
        animation: true,
        scale: 1,
        isEnemy: true,
        name: 'Draggle',
        attacks:[attacks.Draggle.Tackle,attacks.Draggle.RazorLeaf]
    },
    
}

