
import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){

        super("WorldScene");

    }



    create(){


        // ==================================
        // CONFIGURACION
        // ==================================

        const ancho = 1280;
        const alto = 720;



        // ==================================
        // SKY
        // ==================================

        this.add.image(
            640,
            360,
            "sky"
        )
        .setOrigin(0.5)
        .setDisplaySize(1280,720)
        .setDepth(0);





        // ==================================
        // CITY BACK
        // ==================================

        this.add.image(
            640,
            360,
            "city_back"
        )
        .setOrigin(0.5)
        .setDisplaySize(1280,720)
        .setDepth(1);





        // ==================================
        // CABLES
        // ==================================

        this.add.image(
            640,
            360,
            "cables"
        )
        .setOrigin(0.5)
        .setDisplaySize(1280,720)
        .setDepth(2);








        // ==================================
        // FLOOR VISUAL
        // ==================================

        this.floorImage = this.add.image(
            640,
            645,
            "floor"
        )
        .setOrigin(0.5)
        .setDisplaySize(1280,150)
        .setDepth(3);






        // ==================================
        // FLOOR FISICO
        // ==================================

        this.floor = this.add.rectangle(
            640,
            690,
            1280,
            20,
            0x000000,
            0
        );


        this.physics.add.existing(
            this.floor,
            true
        );








        // ==================================
        // KAEL
        // SE DEJA IGUAL
        // ==================================

        this.kael = this.add.rectangle(
            200,
            600,
            50,
            50,
            0x00ff00
        );


        this.physics.add.existing(
            this.kael
        );



        this.kael.body.setGravityY(
            900
        );



        this.kael.body.setMaxVelocity(
            400,
            1000
        );



        this.kael.body.setCollideWorldBounds(
            true
        );



        this.physics.add.collider(
            this.kael,
            this.floor
        );



        this.kael.setDepth(4);








        // ==================================
        // CAMARA
        // ==================================

        this.cameras.main.setBounds(
            0,
            0,
            ancho,
            alto
        );


        this.cameras.main.startFollow(
            this.kael,
            true,
            0.08,
            0.08
        );








        // ==================================
        // CONTROLES
        // ==================================

        this.keys =
        this.input.keyboard.createCursorKeys();



        createKaelAnimations(this);


    }





    update(){



        // MOVIMIENTO

        if(this.keys.left.isDown){

            this.kael.body.setVelocityX(
                -250
            );

        }


        else if(this.keys.right.isDown){

            this.kael.body.setVelocityX(
                250
            );

        }


        else{

            this.kael.body.setVelocityX(
                0
            );

        }






        // SALTO

        if(
            Phaser.Input.Keyboard.JustDown(this.keys.up) &&
            this.kael.body.blocked.down
        ){

            this.kael.body.setVelocityY(
                -850
            );

        }


    }


}


