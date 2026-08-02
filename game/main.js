// game/main.js

import GameConfig from "./config/GameConfig.js";

window.addEventListener("load", () => {
    new Phaser.Game(GameConfig);
});
