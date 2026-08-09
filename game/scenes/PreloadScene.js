export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        console.log("Cargando recursos...");


        // ==============================
        // FONDO DEL MENU
        // ==============================

        this.load.image(
            "menu-fondo",
            "game/assets/menu/fondo.png"
        );


        // ==============================
        // 🎧 MUSICA DEL MENU
        // ==============================

        this.load.audio(
            "musica-menu",
            "game/assets/audio/musica.mp3"
        );


        // ==============================
        // 🎧 MUSICA DEL VALLE
        // ==============================

        this.load.audio(
            "musica-valle",
            "game/assets/audio/valle.mp3"
        );


        // ==============================
        // VALLE DEL CUARZO DEL ALMA
        // ==============================

        this.load.image(
            "sky",
            "game/assets/valle del_alma/sky.png"
        );

        this.load.image(
            "cables",
            "game/assets/valle del_alma/cables.png"
        );

        this.load.image(
            "floor",
            "game/assets/valle del_alma/floor.png"
        );


        // ==============================
        // 💎 GEMA DE ENERGÍA
        // ==============================

        this.load.image(
            "gema-energia",
            "game/assets/cuarzos/gema-energia.png"
        );


        // ==============================
        // KAEL
        // ==============================

        this.load.spritesheet(
            "kael",
            "game/assets/personajes/Kael/spritesheet.png",
            {
                frameWidth: 64,
                frameHeight: 64
            }
        );


        // ==============================
        // 🔎 COMPROBAR GEMA
        // ==============================

        this.load.once(
            "complete",
            () => {

                console.log(
                    "GEMA DE ENERGÍA:",
                    this.textures.exists("gema-energia")
                );

            }
        );

    }


    create() {

        console.log("Recursos cargados");

        this.scene.start("MenuScene");

    }

}
