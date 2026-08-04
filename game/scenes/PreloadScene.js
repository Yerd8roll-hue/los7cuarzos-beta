export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }


    preload() {

        // Fondo
        this.load.image(
            "fondo",
            "assets/fondos/neo_terra.png"
        );


        // Spritesheet de Kael
        this.load.spritesheet(
            "kael",
            "assets/personajes/kael/spritesheet.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );


        // Cuarzo Alma
        this.load.image(
            "cuarzo-alma",
            "assets/cuarzos/alma.png"
        );

    }


    create() {

        console.log("Recursos cargados correctamente");


        // Pasar al mundo
        this.scene.start("WorldScene");

    }

}
