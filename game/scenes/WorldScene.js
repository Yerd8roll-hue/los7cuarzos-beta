
import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        const mundoAncho = 3000;

        this.cameras.main.setBackgroundColor("#05070d");

        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            720
        );

        // SKY
        this.sky = this.add.image(0, 0, "sky");
        this.sky.setOrigin(0, 0);
        this.sky.setDepth(0);
        this.sky.setScrollFactor(0);

        // CABLES
        this.cables = this.add.image(0, 250, "cables");
        this.cables.setOrigin(0, 0);
        this.cables.setDisplaySize(mundoAncho, 180);
        this.cables.setDepth(2);

        // FLOOR
        this.floorImage = this.add.image(0, 570, "floor");
        this.floorImage.setOrigin(0, 0);
        this.floorImage.setDisplaySize(mundoAncho, 150);
        this.floorImage.setDepth(3);

        // PISO FISICO
        this.ground = this.add.rectangle(
            mundoAncho / 2,
            650,
            mundoAncho,
            50,
            0x000000,
            0
        );

        this.physics.add.existing(this.ground, true);

        // KAEL
        createKaelAnimations(this);

        this.kael = this.physics.add.sprite(
            200,
            450,
            "kael"
        );

        this.kael.setDepth(5);
        this.kael.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.kael,
            this.ground
        );

        // CAMARA
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

        // CONTROLES
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

        if (
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ) {
            this.kael.setVelocityX(-180);
        }
        else if (
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ) {
            this.kael.setVelocityX(180);
        }
        else {
            this.kael.setVelocityX(0);
        }

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            ) &&
            this.kael.body.blocked.down
        ) {
            this.kael.setVelocityY(-500);
        }
    }
}


  
