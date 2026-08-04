export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }


    preload() {

        console.log("Cargando BootScene");

    }


    create() {

        console.log("Entrando al MenuScene");

        this.scene.start("MenuScene");

    }

}
