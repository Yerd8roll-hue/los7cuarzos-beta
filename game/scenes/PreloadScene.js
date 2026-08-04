export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }


    preload() {


        // =========================
        // FONDO VALLE DEL ALMA
        // =========================

        this.load.image(
            "sky",
            "assets/valle del_alma/sky.png"
        );


        this.load.image(
            "city_back",
            "assets/valle del_alma/city_back.png"
        );


        this.load.image(
            "city_front",
            "assets/valle del_alma/city_front.png"
        );


        this.load.image(
            "cables",
            "assets/valle del_alma/cables.png"
        );


        this.load.image(
            "floor",
            "assets/valle del_alma/floor.png"
        );


        // =========================
        // PERSONAJE KAEL
        // =========================

        this.load.spritesheet(
            "kael",
            "assets/personajes/kael/spritesheet.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );


        // =========================
        // CUARZO ALMA
        // =========================

        this.load.image(
            "cuarzo-alma",
            "assets/cuarzos/alma.png"
        );

    }


    create() {

        console.log("Todos los recursos cargados");


        this.scene.start("WorldScene");

    }

}

