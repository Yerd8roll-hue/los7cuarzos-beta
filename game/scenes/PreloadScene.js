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

            "game/assets/personajes/Kael/spritesheet.png",

            {
                frameWidth: 64,
                frameHeight: 64
            }

        );




        //=========================================
        // VALLE DEL CUARZO DEL ALMA
        //=========================================


        this.load.image(

            "sky",

            "game/assets/valle%20del_alma/sky.png"

        );



        this.load.image(

            "cityBack",

            "game/assets/valle%20del_alma/city_back.png"

        );



        this.load.image(

            "cityFront",

            "game/assets/valle%20del_alma/city_front.png"

        );



        this.load.image(

            "cables",

            "game/assets/valle%20del_alma/cables.png"

        );



        this.load.image(

            "floor",

            "game/assets/valle%20del_alma/floor.png"

        );




        //=========================================
        // CUARZO ALMA
        //=========================================


        this.load.image(

            "cuarzo-alma",

            "game/assets/cuarzos/alma.png"

        );



    }




    create() {


        console.log("Preload listo");


        this.scene.start("WorldScene");


    }


}
