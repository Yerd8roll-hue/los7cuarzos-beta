import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){
        super("WorldScene");
    }



    create(){


        // ==================================
        // MUNDO LARGO
        // ==================================

        const mundoAncho = 6400;
        const mundoAlto = 720;



        // ==================================
        // SKY
        // ==================================

        this.sky = this.add.tileSprite(
            0,
            0,
            mundoAncho,
            720,
            "sky"
        )
        .setOrigin(0)
        .setScrollFactor(0);





        // ==================================
        // CITY BACK
        // ==================================

        this.cityBack = this.add.tileSprite(
            0,
            0,
            mundoAncho,
            720,
            "city_back"
        )
        .setOrigin(0)
        .setScrollFactor(0.2);






        // ==================================
        // CITY FRONT
        // ==================================

        this.cityFront = this.add.tileSprite(
            0,
            0,
            mundoAncho,
            720,
            "city_front"
        )
        .setOrigin(0)
        .setScrollFactor(0.5);






        // ==================================
        // CABLES
        // ==================================

        this.cables = this.add.tileSprite(
            0,
            0,
            mundoAncho,
            720,
            "cables"
        )
        .setOrigin(0)
        .setScrollFactor(0.7);








        // ==================================
        // FLOOR
        // NO SE CAMBIA NOMBRE
        // ==================================

        this.floor = this.add.tileSprite(
            0,
            570,
            mundoAncho,
            150,
            "floor"
        )
        .setOrigin(0);



        this.physics.add.existing(
            this.floor,
            true
        );








        // ==================================
        // KAEL
        // DEJADO COMO ESTABA
        // ==================================

        this.kael = this.add.rectangle(
            250,
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







        // MOVIMIENTO CABLES

        this.cables.tilePositionX =
        this.cameras.main.scrollX * 0.4;


    }


}


