import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor() {

        super("WorldScene");

    }


    create() {


        // ==================================
        // FONDO PARALLAX
        // ==================================

        this.add.tileSprite(
            0,
            0,
            1280,
            720,
            "sky"
        )
        .setOrigin(0)
        .setScrollFactor(0);



        this.add.tileSprite(
            0,
            0,
            3000,
            720,
            "city_back"
        )
        .setOrigin(0)
        .setScrollFactor(0.2);



        this.add.tileSprite(
            0,
            0,
            3000,
            720,
            "city_front"
        )
        .setOrigin(0)
        .setScrollFactor(0.5);



        this.add.tileSprite(
            0,
            0,
            3000,
            720,
            "cables"
        )
        .setOrigin(0)
        .setScrollFactor(0.7);



        // ==================================
        // TITULO DEL NIVEL
        // ==================================

        this.add.text(
            640,
            40,
            "VALLE DEL CUARZO DEL ALMA",
            {
                fontSize: "32px",
                color:"#00ffff",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);



        // ==================================
        // MUNDO
        // ==================================

        this.physics.world.setBounds(
            0,
            0,
            3000,
            720
        );



        // ==================================
        // PISO
        // ==================================

        this.floor = this.physics.add.staticImage(
            1500,
            680,
            "floor"
        );

        this.floor.setDisplaySize(
            3000,
            80
        );

        this.floor.refreshBody();



        // ==================================
        // KAEL
        // ==================================

        createKaelAnimations(this);



        this.kael = this.physics.add.sprite(
            200,
            500,
            "kael"
        );


        this.kael.setCollideWorldBounds(true);

        this.kael.setBounce(0.1);

        this.kael.setScale(2);



        this.physics.add.collider(
            this.kael,
            this.floor
        );



        // ==================================
        // CAMARA
        // ==================================

        this.cameras.main.startFollow(
            this.kael
        );


        this.cameras.main.setBounds(
            0,
            0,
            3000,
            720
        );



        // ==================================
        // CONTROLES
        // ==================================

        this.keys = this.input.keyboard.createCursorKeys();


    }



    update(){


        if(this.keys.left.isDown){

            this.kael.setVelocityX(-250);

            this.kael.setFlipX(true);

        }

        else if(this.keys.right.isDown){

            this.kael.setVelocityX(250);

            this.kael.setFlipX(false);

        }

        else{

            this.kael.setVelocityX(0);

        }



        if(
            this.keys.up.isDown &&
            this.kael.body.touching.down
        ){

            this.kael.setVelocityY(-500);

        }


    }


}

