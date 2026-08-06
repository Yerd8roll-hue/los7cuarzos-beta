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

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                0,
                "sky"
            )
            .setOrigin(0)
            .setDepth(0);

        }





        // ==================================
        // CITY BACK
        // ==================================

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                120,
                "city_back"
            )
            .setOrigin(0)
            .setDepth(1)
            .setScrollFactor(0.4);

        }






        // ==================================
        // CABLES
        // ==================================

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                80,
                "cables"
            )
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0.6);

        }






        // ==================================
        // FLOOR
        // ==================================

        for(let x = 0; x < mundoAncho; x += tira){

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


        this.kael.setDepth(5);






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

        this.cameras.main.on(
            "camerafollowupdate",
            () => {

                const camX =
                this.cameras.main.scrollX;


                this.children.list.forEach(
                    obj => {

                        if(
                            obj.texture &&
                            obj.texture.key !== "floor"
                        ){

                            obj.x =
                            obj.x;

                        }

                    }
                );

            }
        );


    }




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
