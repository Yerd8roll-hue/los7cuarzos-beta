export default class WorldScene extends Phaser.Scene {


    constructor() {

        super("WorldScene");

    }


    create() {


        // ==================================
        // PARALLAX DEL VALLE
        // ==================================


        // CIELO (IMAGEN GRANDE)
        this.add.image(
            0,
            0,
            "sky"
        )
        .setOrigin(0)
        .setScrollFactor(0);



        // CIUDAD ATRAS
        this.add.tileSprite(
            0,
            0,
            3000,
            720,
            "city_back"
        )
        .setOrigin(0)
        .setScrollFactor(0.2);



        // CIUDAD ADELANTE
        this.add.tileSprite(
            0,
            0,
            3000,
            720,
            "city_front"
        )
        .setOrigin(0)
        .setScrollFactor(0.5);



        // CABLES
        this.add.tileSprite(
            0,
            0,
            3000,
            720,
            "cables"
        )
        .setOrigin(0)
        .setScrollFactor(0.7);



        // ==================================
        // TITULO
        // ==================================

        this.add.text(
            640,
            40,
            "VALLE DEL CUARZO DEL ALMA",
            {
                fontSize:"32px",
                color:"#00ffff"
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
            3000,
            720
        );



        // ==================================
        // PISO
        // ==================================

        this.floor = this.physics.add.staticImage(
            1500,
            680,
            "floor"
        );


        this.floor.refreshBody();



        // ==================================
        // KAEL CUADRO DE PRUEBA
        // ==================================

        this.kael = this.add.rectangle(
            200,
            500,
            40,
            60,
            0x00ff00
        );


        this.physics.add.existing(
            this.kael
        );


        this.kael.body.setCollideWorldBounds(true);



        // COLISION CON PISO

        this.physics.add.collider(
            this.kael,
            this.floor
        );



        // ==================================
        // CAMARA
        // ==================================

        this.cameras.main.startFollow(
            this.kael
        );


        this.cameras.main.setBounds(
            0,
            0,
            3000,
            720
        );



        // ==================================
        // CONTROLES
        // ==================================

        this.keys = this.input.keyboard.createCursorKeys();


    }



    update(){


        // MOVIMIENTO IZQUIERDA

        if(this.keys.left.isDown){

            this.kael.body.setVelocityX(-250);

        }


        // MOVIMIENTO DERECHA

        else if(this.keys.right.isDown){

            this.kael.body.setVelocityX(250);

        }


        else{

            this.kael.body.setVelocityX(0);

        }



        // SALTO

        if(
            this.keys.up.isDown &&
            this.kael.body.touching.down
        ){

            this.kael.body.setVelocityY(-500);

        }


    }


}
  
