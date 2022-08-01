let Looper
const audio = {
    Map: new Howl({
        src:'../Sounds/Village.mp3',
        html5: true,
        volume: 0.1,
        onplay:()=>{
            Looper = setTimeout(()=>{
                audio.Map.play();
            },52000);
        },
        onstop: ()=>{
            clearTimeout(Looper);
        }
    }),
    InitBattle: new Howl({
        src:'../Sounds/InitBattle.wav',
        html5: true,
        volume: 0.1,
    }),
    Fight: new Howl({
        src:'../Sounds/Fight.mp3',
        html5: true,
        volume: 0.3,
        preload: true,
        autoplay: true,
        onplay:()=>{
            Looper = setTimeout(()=>{
                audio.Fight.play();
            },32000);
        },
        onstop: ()=>{
            clearTimeout(Looper);
        }
    }),
    FinalArea: new Howl({
        src:'../Sounds/FinalArea.mp3',
        html5: true,
        volume: 0.3,
        preload: true,
        autoplay: true,
        onplay:()=>{
            Looper = setTimeout(()=>{
                audio.FinalArea.play();
            },63000);
        },
        onstop: ()=>{
            clearTimeout(Looper);
        }
    }),
    HighBattle: new Howl({
        src:'../Sounds/HighBattle.mp3',
        html5: true,
        volume: 0.2,
        preload: true,
        autoplay: true,
        onplay:()=>{
            Looper = setTimeout(()=>{
                audio.HighBattle.play();
            },82000);
        },
        onstop: ()=>{
            clearTimeout(Looper);
        }
    }),
    MidBattle: new Howl({
        src:'../Sounds/MidBattle.mp3',
        html5: true,
        volume: 0.2,
        preload: true,
        autoplay: true,
        onplay:()=>{
            Looper = setTimeout(()=>{
                audio.MidBattle.play();
            },44000);
        },
        onstop: ()=>{
            clearTimeout(Looper);
        }
    }),
    Hit: new Howl({
        src:'../Sounds/Hit.wav',
        html5: true,
        volume: 0.2,
    }),
    Hit2: new Howl({
        src:'../Sounds/Hit2.wav',
        html5: true,
        volume: 0.2,
    }),
    Fireball: new Howl({
        src:'../Sounds/Fireball.wav',
        html5: true,
        volume: 0.2,
    }),
    Explosion: new Howl({
        src:'../Sounds/Explosion.wav',
        html5: true,
        volume: 0.2,
    }),
    RazorLeaf: new Howl({
        src:'../Sounds/RazorLeaf.wav',
        html5: true,
        volume: 0.2,
    }),
    LevelUp: new Howl({
        src:'../Sounds/LevelUp.wav',
        html5: true,
        volume: 0.2,
    }),
    GameOver: new Howl({
        src:'../Sounds/GameOver.wav',
        html5: true,
        volume: 0.7,
    }),
    Success: new Howl({
        src:'../Sounds/Success.wav',
        html5: true,
        volume: 0.3,
    }),
    Menu: new Howl({
        src:'../Sounds/Menu.wav',
        html5: true,
        volume: 0.3,
    }),
    RunAway: new Howl({
        src:'../Sounds/RunAway.wav',
        html5: true,
        volume: 0.6,
    }),
    RunFailed: new Howl({
        src:'../Sounds/RunFailed.wav',
        html5: true,
        volume: 0.6,
    }),

}