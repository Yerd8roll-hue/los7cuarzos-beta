import { createKaelAnimations } from "../animations/KaelAnimations.js";


export default class WorldScene extends Phaser.Scene {


    constructor(){
        super("WorldScene");
    }



    create(){


        const ancho = 1280;
        const alto = 720;



        // ==================================
        // SKY (ARRIBA)
        // ==================================

        this.add.image(
            0,
            0,
            "sky"
        )
        .setOrigin(0)
        .setDepth(0);





        // ==================================
        // CITY BACK (MEDIO)
        // ==================================

        this.add.image(
            0,
            250,
            "city_back"
        )
        .setOrigin(0)
        .setDepth(1);






        // ==================================
        // CABLES (SOBRE CIUDAD)
        // ==================================

        this.add.image(
            0,
            220,
            "cables"
        )
        .setOrigin(0)
        .setDepth(2);







        // ==================================
        // FLOOR (ABAJO)
        // ==================================

        this.floorImage = this.add.image(
            0,
            570,
            "floor"
        )
        .setOrigin(0)
        .setDepth(3);






        // ==================================
        // PISO FISICO
        // ==================================

        this.floor = this.add.rectangle(
            640,
            560,
            1280,
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
            640,
            200,
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
            1000
        );


        this.kael.body.setCollideWorldBounds(
            true
        );


        this.physics.add.collider(
            this.kael,
            this.floor
        );


        this.kael.setDepth(4);








        // ==================================
        // CAMARA
        // ==================================

        this.physics.world.setBounds(
            0,
            0,
            ancho,
            alto
        );


        this.cameras.main.setBounds(
            0,
            0,
            ancho,
            alto
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
  
