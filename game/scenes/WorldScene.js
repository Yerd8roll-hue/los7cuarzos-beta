import { createKaelAnimations } from "../animations/KaelAnimations.js";

const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 941;

const FLOOR_Y = 900;

export default class WorldScene extends Phaser.Scene {

    constructor() {

        super("WorldScene");

    }

    create() {

        //=========================================
        // MUNDO
        //=========================================

        this.physics.world.setBounds(
            0,
            0,
            WORLD_WIDTH,
            WORLD_HEIGHT
        );

        this.cameras.main.setBounds(
            0,
            0,
            WORLD_WIDTH,
            WORLD_HEIGHT
        );

        this.cameras.main.setBackgroundColor("#05070d");

        //=========================================
        // FONDO
        //=========================================

        this.sky = this.add.image(
            0,
            0,
            "sky"
        )
        .setOrigin(0)
        .setDepth(0);

        this.cityBack = this.add.image(
            0,
            0,
            "cityBack"
        )
        .setOrigin(0)
        .setDepth(1);

        this.cityFront = this.add.image(
            0,
            0,
            "cityFront"
        )
        .setOrigin(0)
        .setDepth(2);

        this.floor = this.add.image(
            0,
            0,
            "floor"
        )
        .setOrigin(0)
        .setDepth(3);

        this.cables = this.add.image(
            0,
            0,
            "cables"
        )
        .setOrigin(0)
        .setDepth(5);

        //=========================================
        // TAMAÑO ORIGINAL
        //=========================================

        this.sky.setDisplaySize(
            1672,
            941
        );

        this.cityBack.setDisplaySize(
            1672,
            941
        );

        this.cityFront.setDisplaySize(
            1672,
            941
        );

        this.floor.setDisplaySize(
            1672,
            941
        );

        this.cables.setDisplaySize(
            1672,
            941
        );

        //=========================================
        // SUELO FÍSICO
        //=========================================

        this.ground = this.add.rectangle(
            836,
            FLOOR_Y,
            1672,
            24,
            0x000000,
            0
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
            250,
            FLOOR_Y - 80,
            "kael"
        );

        this.kael.setDepth(4);

        this.kael.setBounce(0);

        this.kael.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.kael,
            this.ground
        );

            //=========================================
        // CÁMARA
        //=========================================

        this.cameras.main.startFollow(
            this.kael,
            true,
            0.08,
            0.08
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

        //=========================================
        // TÍTULO DEL NIVEL
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
        .setScrollFactor(0)
        .setDepth(100);

    }

    update() {

        //=========================================
        // PARALLAX
        //=========================================

        const scrollX = this.cameras.main.scrollX;

        this.sky.x = scrollX * 0.05;

        this.cityBack.x = scrollX * 0.15;

        this.cityFront.x = scrollX * 0.30;

        this.cables.x = scrollX * 0.45;

        //=========================================
        // MOVIMIENTO
        //=========================================

        if (
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ) {

            this.kael.setVelocityX(-220);

            this.kael.setFlipX(true);

            if (this.anims.exists("kael-walk")) {

                this.kael.play(
                    "kael-walk",
                    true
                );

            }

        }
        else if (
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ) {

            this.kael.setVelocityX(220);

            this.kael.setFlipX(false);

            if (this.anims.exists("kael-walk")) {

                this.kael.play(
                    "kael-walk",
                    true
                );

            }

        }
        else {

            this.kael.setVelocityX(0);

            if (this.anims.exists("kael-idle")) {

                this.kael.play(
                    "kael-idle",
                    true
                );

            }

        }
                //=========================================
        // SALTO
        //=========================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            ) &&
            this.kael.body.blocked.down
        ) {

            this.kael.setVelocityY(-520);

            if (this.anims.exists("kael-jump")) {

                this.kael.play(
                    "kael-jump",
                    true
                );

            }

        }

    }

}
  
