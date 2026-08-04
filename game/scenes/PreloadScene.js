export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }


    preload() {


        //=========================================
        // KAEL
        //=========================================

        this.load.spritesheet(
            "kael",
            "assets/personajes/kael/spritesheet.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );


        //=========================================
        // CUARZO ALMA
        //=========================================

        this.load.image(
            "cuarzo-alma",
            "assets/cuarzos/alma.png"
        );


        //=========================================
        // VALLE DEL CUARZO DEL ALMA
        //=========================================

        this.load.image(
            "sky",
            "assets/valle_del_alma/sky.png"
        );


        this.load.image(
            "cityBack",
            "assets/valle_del_alma/city_back.png"
        );


        this.load.image(
            "cityFront",
            "assets/valle_del_alma/city_front.png"
        );


        this.load.image(
            "cables",
            "assets/valle_del_alma/cables.png"
        );


    }


    create() {

        console.log("Preload listo");

        this.scene.start("WorldScene");

    }

}
         
