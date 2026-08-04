export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }


    preload() {


        // KAEL

        this.load.spritesheet(
            "kael",
            "assets/personajes/kael/spritesheet.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );


        // CUARZO ALMA

        this.load.image(
            "cuarzo-alma",
            "assets/cuarzos/alma.png"
        );


    }


    create() {

        console.log("Preload listo");

        this.scene.start("WorldScene");

    }

}
     
