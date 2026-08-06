export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }


    preload() {


        console.log("Cargando recursos...");


        // ==============================
        // VALLE DEL CUARZO DEL ALMA
        // ==============================


        this.load.image(
            "sky",
            "game/assets/valle del_alma/sky.png"
        );


        this.load.image(
            "city_back",
            "game/assets/valle del_alma/city_back.png"
        );


        this.load.image(
            "city_front",
            "game/assets/valle del_alma/city_front.png"
        );


        this.load.image(
            "cables",
            "game/assets/valle del_alma/cables.png"
        );


        this.load.image(
            "floor",
            "game/assets/valle del_alma/floor.png"
        );


    }


    create() {

        console.log("Recursos cargados");

        this.scene.start("MenuScene");

    }

}
