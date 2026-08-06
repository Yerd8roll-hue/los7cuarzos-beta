
import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){

        super("WorldScene");

    }



    create(){


        // ==================================
        // MUNDO
        // ==================================

        const mundoAncho = 6400;
        const mundoAlto = 720;
        const anchoTira = 1280;



        // ==================================
        // SKY
        // ==================================

        for(let x = 0; x < mundoAncho; x += anchoTira){

            this.add.image(
                x,
                0,
                "sky"
            )
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(0);

        }




        // ==================================
        // CITY BACK
        // ==================================

        for(let x = 0; x < mundoAncho; x += anchoTira){

            this.add.image(
                x,
                0,
                "city_back"
            )
            .setOrigin(0)
            .setScrollFactor(0.3)
            .setDepth(1);

        }




        // ==================================
        // CABLES
        // ==================================

        for(let x = 0; x < mundoAncho; x += anchoTira){

            this.add.image(
                x,
                0,
                "cables"
            )
            .setOrigin(0)
            .setScrollFactor(0.6)
            .setDepth(2);

        }





        // ==================================
        // FLOOR VISUAL
        // ==================================

        for(let x = 0; x < mundoAncho; x += anchoTira){

            this.add.image(
                x,
                570,
                "floor"
            )
            .setOrigin(0)
            .setDisplaySize(1280,150)
            .setDepth(3);

        }





        // ==================================
        // FLOOR FISICO
        // ==================================

        this.floor = this.add.rectangle(
            mundoAncho / 2,
            645,
            mundoAncho,
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
        // NO TOCAR
        // ==================================

        this.kael = this.add.rectangle(
            200,
            760,
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
        // LIMITES
        // ==================================

        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            mundoAlto
        );


        this.cameras.main.setBounds(
            0,
            0,
            mundoAncho,
            mundoAlto
        );






        // ==================================
        // CAMARA
        // ==================================

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
