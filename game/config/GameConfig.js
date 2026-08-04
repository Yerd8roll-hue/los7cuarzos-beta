import BootScene from "../scenes/BootScene.js";
import MenuScene from "../scenes/MenuScene.js";
import PreloadScene from "../scenes/PreloadScene.js";
import WorldScene from "../scenes/WorldScene.js";


const config = {

    type: Phaser.AUTO,

    width: 800,
    height: 600,

    physics: {

        default: "arcade",

        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }

    },


    scene: [
        BootScene,
        MenuScene,
        PreloadScene,
        WorldScene
    ]

};


export default config;
