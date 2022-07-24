
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
        scale: 1.2,
        name: 'Emby',
        attacks:[attacks.emby.Tackle, attacks.emby.Fireball]
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
        attacks:[attacks.draggle.Tackle,attacks.draggle.RazorLeaf]
    },
    
}

