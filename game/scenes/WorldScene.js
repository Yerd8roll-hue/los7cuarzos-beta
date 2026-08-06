import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){
        super("WorldScene");
    }



    create(){


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

for(let x = 0; x < mundoAncho; x += tira){

    this.add.image(
        x,
        700,
        "cables"
    )
    .setOrigin(0, 1)
    .setDisplaySize(1280, 200)
    .setDepth(2)
    .setScrollFactor(1);

}
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

        this.kael = this.add.rectangle(
            400,
            -300,
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
            1200
        );


        this.kael.body.setCollideWorldBounds(
            true
        );


        this.physics.add.collider(
            this.kael,
            this.floor
        );


       this.kael.setDepth(3);





        // ==================================
        // LIMITES
        // ==================================

        this.physics.world.setBounds(
            0,
            -500,
            mundoAncho,
            1200
        );



        this.cameras.main.setBounds(
            0,
            0,
            mundoAncho,
            720
        );



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
