
import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        const mundoAncho = 6400;
        const tira = 1280;

        // ==================================
        // SKY
        // ==================================

        this.sky = this.add.image(
            0,
            -170,
            "sky"
        );

        this.sky
            .setOrigin(0)
            .setDepth(0)
            .setScrollFactor(0.2);

        // ==================================
        // CABLES
        // ==================================

        this.cables = this.add.image(
            0,
            500,
            "cables"
        );

        this.cables
            .setOrigin(0)
            .setDisplaySize(mundoAncho, 180)
            .setDepth(2)
            .setScrollFactor(1);

        // ==================================
        // FLOOR
        // ==================================

        for (let x = 0; x < mundoAncho; x += tira) {

            this.add.image(
                x,
                570,
                "floor"
            )
            .setOrigin(0)
            .setDepth(3);

        }

        // ==================================
        // PISO FISICO
        // ==================================

        this.floor = this.add.rectangle(
            mundoAncho / 2,
            620,
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
        // ==================================

les = this.add.image(
    0,
    370,
    "cables"
)
.setOrigin(0)
.setDisplaySize(6400, 200)
.setDepth(2)
.setScrollFactor(1);
    .setOrigin(0)
    .setDisplaySize(1280,150)
    .setDepth(1);

}

        // ==================================
        // PISO FISICO
        // ==================================

        this.floor = this.add.rectangle(
            mundoAncho / 2,
            620,
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
// ==================================

     


   





       ======================
        // CONTROLES
        // ==================================

        this.keys =
        this.input.keyboard.createCursorKeys



        createKaelAnimations(this);



        // movimiento parallax



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
