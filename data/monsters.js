
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
        attacks:[attacks.emby.Tackle, attacks.emby.Fireball],
        healthBasic:75,
        healthPerLv: 5,
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
        attacks:[attacks.draggle.Tackle,attacks.draggle.RazorLeaf],
        healthBasic: 50,
        healthPerLv: 10,
    },
    Demon:{
        position:{
            x: 770,
            y: 75
        },
        image: {
            src: './../Image/demonSprite.png'
        },
        frames:{ max: 5, hold: 8},
        animation: true,
        scale: 2.7,
        isEnemy: true,
        name: 'Demon',
        attacks:[attacks.draggle.Tackle,attacks.draggle.RazorLeaf],
        healthBasic: 50,
        healthPerLv: 10,
    },
    GiantFrog:{
        position:{
            x: 785,
            y: 100
        },
        image: {
            src: './../Image/giantFrogSprite.png'
        },
        frames:{ max: 5, hold: 8},
        animation: true,
        scale: 2.7,
        isEnemy: true,
        name: 'GiantFrog',
        attacks:[attacks.draggle.Tackle,attacks.draggle.RazorLeaf],
        healthBasic: 50,
        healthPerLv: 10,
    },
    GiantRacoon:{
        position:{
            x: 760,
            y: 40
        },
        image: {
            src: './../Image/giantRacoonSprite.png'
        },
        frames:{ max: 6, hold: 9},
        animation: true,
        scale: 2.7,
        isEnemy: true,
        name: 'GiantRacoon',
        attacks:[attacks.draggle.Tackle,attacks.draggle.RazorLeaf],
        healthBasic: 50,
        healthPerLv: 10,
    },
}

