import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor() {

        super("WorldScene");

    }



    create() {


        // =========================================
        // COLOR DE FONDO
        // =========================================

        this.cameras.main.setBackgroundColor("#05070d");



        // =========================================
        // MUNDO
        // =========================================

        const mundoAncho = 3000;


        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            720
        );



        // =========================================
        // SKY
        // =========================================

        this.sky = this.add.image(
            0,
            0,
            "sky"
        );

        this.sky
            .setOrigin(0)
            .setDepth(0)
            .setScrollFactor(0);
// CABLES
this.cables = this.add.image(0, 0, "cables");
this.cables.setOrigin(0, 0);
this.cables.setDepth(2);
// TRANSICIÓN SUAVE ENTRE CABLES Y CIELO
this.cablesFade = this.add.rectangle(
    0,
    0,
    1672,
    180,
    0x05070d,
    0.25
);

this.cablesFade.setOrigin(0, 0);
this.cablesFade.setDepth(3);
        // =========================================
        // FLOOR VISUAL
        // =========================================

        this.floorImage = this.add.image(
            0,
            570,
            "floor"
        );

        this.floorImage
            .setOrigin(0)
            .setDisplaySize(
                mundoAncho,
                150
            )
            .setDepth(3);



        // =========================================
        // PISO FISICO
        // =========================================

        this.ground = this.add.rectangle(
            mundoAncho / 2,
            650,
            mundoAncho,
            50,
            0x000000,
            0
        );


        this.physics.add.existing(
            this.ground,
            true
        );



        // =========================================
        // TITULO
        // =========================================

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



        // =========================================
        // KAEL
        // =========================================

        createKaelAnimations(this);


        this.kael = this.physics.add.sprite(
            200,
            450,
            "kael"
        );


        this.kael.setDepth(5);

        this.kael.setBounce(0);

        this.kael.setCollideWorldBounds(true);



        this.physics.add.collider(
            this.kael,
            this.ground
        );



        // =========================================
        // CAMARA
        // =========================================

        this.cameras.main.startFollow(
            this.kael,
            true
        );


        this.cameras.main.setBounds(
            0,
            0,
            mundoAncho,
            720
        );



        // =========================================
        // CONTROLES
        // =========================================

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



        // =========================================
        // MOVIMIENTO KAEL
        // =========================================


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



        // =========================================
        // SALTO
        // =========================================


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


      


      
