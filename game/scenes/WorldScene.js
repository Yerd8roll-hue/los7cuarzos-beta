import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor() {
        super("WorldScene");
    }



    create() {


        //=========================================
        // COLOR DE FONDO
        //=========================================

        this.cameras.main.setBackgroundColor("#05070d");



        //=========================================
        // MUNDO
        //=========================================

        this.physics.world.setBounds(
            0,
            0,
            3000,
            720
        );



        //=========================================
        // CAPAS DEL VALLE DEL ALMA
        //=========================================


        // CIELO

        this.sky = this.add.image(
            0,
            0,
            "sky"
        )
        .setOrigin(0)
        .setDepth(0)
        .setScrollFactor(0);



        // CIUDAD LEJANA

        this.cityBack = this.add.image(
            0,
            0,
            "cityBack"
        )
        .setOrigin(0)
        .setDepth(1)
        .setScrollFactor(0);



        // CIUDAD CERCANA

        this.cityFront = this.add.image(
            0,
            0,
            "cityFront"
        )
        .setOrigin(0)
        .setDepth(2)
        .setScrollFactor(0);



        // CABLES SUPERIORES

        this.cables = this.add.image(
            0,
            0,
            "cables"
        )
        .setOrigin(0)
        .setDepth(3)
        .setScrollFactor(0);



        //=========================================
        // PISO VISUAL
        //=========================================


        this.floorImage = this.add.image(
            0,
            620,
            "floor"
        )
        .setOrigin(0)
        .setDepth(4);



        //=========================================
        // PISO FISICO
        //=========================================


        this.ground = this.add.rectangle(
            1500,
            690,
            3000,
            60,
            0x000000,
            0
        );


        this.physics.add.existing(
            this.ground,
            true
        );



        //=========================================
        // TITULO
        //=========================================

        this.add.text(
            640,
            50,
            "VALLE DEL CUARZO\nDEL ALMA",
            {
                fontSize:"32px",
                color:"#00ffff",
                fontStyle:"bold",
                align:"center"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(10);



        //=========================================
        // KAEL
        //=========================================


        createKaelAnimations(this);


        this.kael = this.physics.add.sprite(
            200,
            500,
            "kael"
        );


        this.kael.setDepth(5);

        this.kael.setBounce(0);

        this.kael.setCollideWorldBounds(true);



        this.physics.add.collider(
            this.kael,
            this.ground
        );



        //=========================================
        // CAMARA
        //=========================================


        this.cameras.main.startFollow(
            this.kael,
            true
        );


        this.cameras.main.setBounds(
            0,
            0,
            3000,
            720
        );



        //=========================================
        // CONTROLES
        //=========================================


        this.cursors =
        this.input.keyboard.createCursorKeys();



        this.keys =
        this.input.keyboard.addKeys({

            A: Phaser.Input.Keyboard.KeyCodes.A,

            D: Phaser.Input.Keyboard.KeyCodes.D,

            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE

        });


    }




    update() {



        //=========================================
        // PARALLAX
        //=========================================


        this.cityBack.x =
        this.cameras.main.scrollX * 0.15;



        this.cityFront.x =
        this.cameras.main.scrollX * 0.30;



        this.cables.x =
        this.cameras.main.scrollX * 0.45;




        //=========================================
        // MOVIMIENTO KAEL
        //=========================================


        if(
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ){

            this.kael.setVelocityX(-180);

            this.kael.setFlipX(true);

        }

        else if(
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ){

            this.kael.setVelocityX(180);

            this.kael.setFlipX(false);

        }

        else{

            this.kael.setVelocityX(0);

        }



        //=========================================
        // SALTO
        //=========================================


        if(
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            )
            &&
            this.kael.body.blocked.down
        ){

            this.kael.setVelocityY(-500);

        }


    }


} 

      
