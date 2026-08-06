// game/config/GameConfig.js

import BootScene from "../scenes/BootScene.js";
import PreloadScene from "../scenes/PreloadScene.js";
import MenuScene from "../scenes/MenuScene.js";
import WorldScene from "../scenes/WorldScene.js";

const GameConfig = {

    type: Phaser.AUTO,

    parent: "game-container",

    width: 1280,
    height: 720,

    backgroundColor: "#05070d",

    pixelArt: true,

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 900
            },

            debug: false

        }

    },

    scale: {

        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH

    },

    scene: [

        BootScene,
        PreloadScene,
        MenuScene,
        WorldScene

    ]

};

export default GameConfig;
