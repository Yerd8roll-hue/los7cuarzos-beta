// config/GameConfig.js

import BootScene from "../scenes/BootScene.js";
import PreloadScene from "../scenes/PreloadScene.js";
import MenuScene from "../scenes/MenuScene.js";
import WorldScene from "../scenes/WorldScene.js";
import PauseScene from "../scenes/PauseScene.js";
import UIScene from "../scenes/UIScene.js";

const GameConfig = {
    type: Phaser.AUTO,

    parent: "game-container",

    width: 1280,
    height: 720,

    backgroundColor: "#0d0d0d",

    pixelArt: false,

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
        WorldScene,
        PauseScene,
        UIScene
    ]
};

export default GameConfig;
