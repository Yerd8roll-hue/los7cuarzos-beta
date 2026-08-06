import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){
        super("WorldScene");
    }


    create(){


        const mundoAncho = 6400;
        const tira = 1280;



        // ============================
        // SKY REPETIDO
        // ============================

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                0,
                "sky"
            )
            .setOrigin(0)
            .setDepth(0);

        }



        // ============================
        // CITY BACK
        // ============================

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                180,
                "city_back"
            )
            .setOrigin(0)
            .setDepth(1);

        }



        // ============================
        // CABLES
        // ============================

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                160,
                "cables"
            )
            .setOrigin(0)
            .setDepth(2);

        }



        // ============================
        // FLOOR
        // ============================

        for(let x = 0; x < mundoAncho; x += tira){

            this.add.image(
                x,
                570,
                "floor"
            )
            .setOrigin(0)
            .setDepth(3);

        }



        // ============================
        // PISO FISICO
        // ============================

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




        // ============================
        // KAEL CAE DESDE ARRIBA
        // ============================

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


        this.kael.setDepth(4);




        // ============================
        // MUNDO Y CAMARA
        // ============================

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




        // ============================
        // CONTROLES
        // ============================

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
