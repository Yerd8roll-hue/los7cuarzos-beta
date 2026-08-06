import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){
        super("WorldScene");
    }



    create(){


        const ancho = 3344;
        const alto = 941;



        // ==================================
        // CIELO
        // ==================================

        this.add.image(0,0,"sky")
        .setOrigin(0)
        .setScrollFactor(0);


        this.add.image(1672,0,"sky")
        .setOrigin(0)
        .setScrollFactor(0);




        // ==================================
        // CIUDAD ATRAS
        // ==================================

        this.add.image(0,0,"city_back")
        .setOrigin(0)
        .setScrollFactor(0.2);


        this.add.image(1672,0,"city_back")
        .setOrigin(0)
        .setScrollFactor(0.2);






        // ==================================
        // CIUDAD ADELANTE
        // ==================================

        this.add.image(0,0,"city_front")
        .setOrigin(0)
        .setScrollFactor(0.45);


        this.add.image(1672,0,"city_front")
        .setOrigin(0)
        .setScrollFactor(0.45);






        // ==================================
        // CABLES
        // ==================================

        this.add.image(0,0,"cables")
        .setOrigin(0)
        .setScrollFactor(0.35);


        this.add.image(1672,0,"cables")
        .setOrigin(0)
        .setScrollFactor(0.35);








        // ==================================
        // TITULO
        // ==================================

        this.add.text(
            640,
            50,
            "VALLE DEL CUARZO DEL ALMA",
            {
                fontSize:"32px",
                color:"#00ffff",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);







        // ==================================
        // LIMITES
        // ==================================

        this.physics.world.setBounds(
            0,
            0,
            ancho,
            alto
        );







        // ==================================
        // PISO VISUAL
        // ==================================

        this.floorVisual1 =
        this.add.image(
            0,
            760,
            "floor"
        )
        .setOrigin(0)
        .setScale(
            1,
            0.45
        );



        this.floorVisual2 =
        this.add.image(
            1672,
            760,
            "floor"
        )
        .setOrigin(0)
        .setScale(
            1,
            0.45
        );







        // ==================================
        // PISO FISICO
        // ==================================

        this.floor =
        this.add.rectangle(
            1672,
            800,
            3344,
            40,
            0x000000,
            0
        );


        this.physics.add.existing(
            this.floor,
            true
        );







        // ==================================
        // KAEL
        // ==================================

        this.kael =
        this.add.rectangle(
            250,
            600,
            50,
            50,
            0x00ff00
        );


        this.physics.add.existing(
            this.kael
        );


        this.kael.body.setGravityY(700);


        this.kael.body.setMaxVelocity(
            400,
            900
        );


        this.kael.body.setCollideWorldBounds(
            true
        );



        this.physics.add.collider(
            this.kael,
            this.floor
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


        this.cameras.main.setBounds(
            0,
            0,
            ancho,
            alto
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

            this.kael.body.setVelocityX(-250);

        }


        else if(this.keys.right.isDown){

            this.kael.body.setVelocityX(250);

        }


        else{

            this.kael.body.setVelocityX(0);

        }







        if(
            Phaser.Input.Keyboard.JustDown(this.keys.up) &&
            this.kael.body.blocked.down
        ){

            this.kael.body.setVelocityY(-850);

        }


    }


}
        

    

    
