export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }


    create() {

        console.log("BOOT OK");

        this.scene.start("MenuScene");

    }

}
