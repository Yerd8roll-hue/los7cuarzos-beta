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

        this.physics.world.setBounds(0, 0, 3000, 720);

        //=========================================
        // FONDO PARALLAX
        //=========================================

        this.sky = this.add.tileSprite(
            0,
            0,
            1280,
            720,
            "sky"
        )
        .setOrigin(0)
        .setScrollFactor(0);

        this.cityBack = this.add.tileSprite(
            0,
            0,
            1280,
            720,
            "cityBack"
        )
        .setOrigin(0)
        .setScrollFactor(0);

        this.cityFront = this.add.tileSprite(
            0,
            0,
            1280,
            720,
            "cityFront"
        )
        .setOrigin(0)
        .setScrollFactor(0);

        this.cables = this.add.tileSprite(
            0,
            0,
            1280,
            720,
            "cables"
        )
        .setOrigin(0)
        .setScrollFactor(0);

        //=========================================
        // TITULO
        //=========================================

        this.add.text(
            640,
            40,
            "VALLE DEL CUARZO DEL ALMA",
            {
                fontSize: "32px",
                color: "#00ffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);

        //=========================================
        // SUELO
        //=========================================

        this.ground = this.add.rectangle(
            1500,
            690,
            3000,
            60,
            0x353535
        );

        this.physics.add.existing(
            this.ground,
            true
        );

        //=========================================
        // ANIMACIONES
        //=========================================

        createKaelAnimations(this);

        //=========================================
        // KAEL
        //=========================================

        this.kael = this.physics.add.sprite(
            200,
            500,
            "kael"
        );

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

                A:
                Phaser.Input.Keyboard.KeyCodes.A,

                D:
                Phaser.Input.Keyboard.KeyCodes.D,

                SPACE:
                Phaser.Input.Keyboard.KeyCodes.SPACE

            });

    }

    update() {

        //=========================================
        // PARALLAX
        //=========================================

        this.sky.tilePositionX =
            this.cameras.main.scrollX * 0.05;

        this.cityBack.tilePositionX =
            this.cameras.main.scrollX * 0.15;

        this.cityFront.tilePositionX =
            this.cameras.main.scrollX * 0.30;

        this.cables.tilePositionX =
            this.cameras.main.scrollX * 0.45;

        //=========================================
        // MOVIMIENTO
        //=========================================

        if (
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ) {

            this.kael.setVelocityX(-180);
            this.kael.setFlipX(true);

        }
        else if (
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ) {

            this.kael.setVelocityX(180);
            this.kael.setFlipX(false);

        }
        else {

            this.kael.setVelocityX(0);

        }

        //=========================================
        // SALTO
        //=========================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            )
            &&
            this.kael.body.blocked.down
        ) {

            this.kael.setVelocityY(-500);

        }

    }

}
