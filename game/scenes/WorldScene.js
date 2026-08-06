
export default class WorldScene extends Phaser.Scene {


    constructor() {
        super("WorldScene");
    }


    create() {


        // ==================================
        // VALLE DEL CUARZO DEL ALMA
        // CAPAS 1672 x 941
        // ==================================


        // CIELO (MAS VISIBLE)

        this.add.image(
            0,
            0,
            "sky"
        )
        .setOrigin(0)
        .setScrollFactor(0);



        // CIUDAD DEL FONDO

        this.add.image(
            0,
            0,
            "city_back"
        )
        .setOrigin(0)
        .setScrollFactor(0.2);



        // CIUDAD CERCANA

        this.add.image(
            0,
            0,
            "city_front"
        )
        .setOrigin(0)
        .setScrollFactor(0.5);



        // CABLES

        this.add.image(
            0,
            0,
            "cables"
        )
        .setOrigin(0)
        .setScrollFactor(0.7);



        // ==================================
        // TITULO
        // ==================================

        this.add.text(
            836,
            40,
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
            1672,
            941
        );



        // ==================================
        // PISO COMPLETO
        // ==================================

        this.floor = this.physics.add.staticImage(
            836,
            850,
            "floor"
        );


        this.floor.refreshBody();



        // ==================================
        // KAEL CUADRADO DE PRUEBA
        // ==================================

        this.kael = this.add.rectangle(
            200,
            700,
            50,
            50,
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
            1672,
            941
        );



        // ==================================
        // CONTROLES
        // ==================================

        this.keys =
        this.input.keyboard.createCursorKeys();


    }



    update(){


        // MOVIMIENTO

        if(this.keys.left.isDown){

            this.kael.body.setVelocityX(-250);

        }


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
