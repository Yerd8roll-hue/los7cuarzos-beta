
 export default class WorldScene extends Phaser.Scene {


    constructor(){
        super("WorldScene");
    }



    create(){


        // ==================================
        // MAPA GRANDE
        // ==================================

        const ancho = 4000;
        const alto = 941;



        // ==================================
        // VALLE DEL CUARZO DEL ALMA
        // FONDOS
        // ==================================


        // CIELO

        this.add.tileSprite(
            0,
            0,
            ancho,
            alto,
            "sky"
        )
        .setOrigin(0)
        .setScrollFactor(0);



        // CIUDAD ATRAS

        this.add.tileSprite(
            0,
            0,
            ancho,
            alto,
            "city_back"
        )
        .setOrigin(0)
        .setScrollFactor(0.2);



        // CIUDAD ADELANTE

        this.add.tileSprite(
            0,
            0,
            ancho,
            alto,
            "city_front"
        )
        .setOrigin(0)
        .setScrollFactor(0.5);



        // CABLES

        this.add.tileSprite(
            0,
            0,
            ancho,
            alto,
            "cables"
        )
        .setOrigin(0)
        .setScrollFactor(0.7);




        // ==================================
        // TITULO
        // ==================================

        this.add.text(
            640,
            50,
            "VALLE DEL CUARZO DEL ALMA",
            {
                fontSize:"32px",
                color:"#00ffff",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);




        // ==================================
        // LIMITES DEL MUNDO
        // ==================================

        this.physics.world.setBounds(
            0,
            0,
            ancho,
            alto
        );





        // ==================================
        // SUELO VISUAL
        // ==================================

        this.add.tileSprite(
            0,
            820,
            ancho,
            180,
            "floor"
        )
        .setOrigin(0);





        // ==================================
        // SUELO FISICO
        // ==================================

        this.floor =
        this.add.rectangle(
            2000,
            850,
            ancho,
            50,
            0x000000,
            0
        );


        this.physics.add.existing(
            this.floor,
            true
        );





        // ==================================
        // KAEL TEMPORAL
        // ==================================

        this.kael =
        this.add.rectangle(
            200,
            600,
            50,
            50,
            0x00ff00
        );


        this.physics.add.existing(
            this.kael
        );


        this.kael.body.setGravityY(900);


        this.kael.body.setCollideWorldBounds(
            true
        );





        // ==================================
        // COLISION
        // ==================================

        this.physics.add.collider(
            this.kael,
            this.floor
        );






        // ==================================
        // CAMARA
        // ==================================

        this.cameras.main.startFollow(
            this.kael,
            true,
            0.08,
            0.08
        );


        this.cameras.main.setBounds(
            0,
            0,
            ancho,
            alto
        );






        // ==================================
        // CONTROLES
        // ==================================

        this.keys =
        this.input.keyboard.createCursorKeys();


    }






    update(){



        // ==================================
        // MOVIMIENTO
        // ==================================


        if(this.keys.left.isDown){

            this.kael.body.setVelocityX(-250);

        }


        else if(this.keys.right.isDown){

            this.kael.body.setVelocityX(250);

        }


        else{

            this.kael.body.setVelocityX(0);

        }





        // ==================================
        // SALTO
        // ==================================

        if(
            Phaser.Input.Keyboard.JustDown(this.keys.up) &&
            this.kael.body.touching.down
        ){

            this.kael.body.setVelocityY(-500);

        }


    }


}
