export default class WorldScene extends Phaser.Scene {


    constructor() {
        super("WorldScene");
    }


    create() {


        // ==================================
        // VALLE DEL CUARZO DEL ALMA
        // IMAGENES 1672 x 941
        // ==================================


        const centroX = 836;
        const centroY = 470;



        // CIELO

        this.add.image(
            centroX,
            centroY,
            "sky"
        )
        .setOrigin(0.5)
        .setScrollFactor(0);



        // CIUDAD ATRAS

        this.add.image(
            centroX,
            centroY,
            "city_back"
        )
        .setOrigin(0.5)
        .setScrollFactor(0.2);



        // CIUDAD ADELANTE

        this.add.image(
            centroX,
            centroY,
            "city_front"
        )
        .setOrigin(0.5)
        .setScrollFactor(0.5);



        // CABLES

        this.add.image(
            centroX,
            centroY,
            "cables"
        )
        .setOrigin(0.5)
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
                color:"#00ffff",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);



        // ==================================
        // MUNDO
        // ==================================

        this.physics.world.setBounds(
            0,
            0,
            1672,
            941
        );



        // ==================================
        // PISO
        // ==================================

        this.floor = this.physics.add.staticImage(
            centroX,
            850,
            "floor"
        );


        this.floor.refreshBody();



        // ==================================
        // KAEL CUADRADO
        // ==================================

        this.kael = this.add.rectangle(
            200,
            750,
            50,
            50,
            0x00ff00
        );


        this.physics.add.existing(
            this.kael
        );


        this.kael.body.setCollideWorldBounds(true);



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
