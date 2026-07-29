class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }


    create() {

        // Fondo del mundo
        this.cameras.main.setBackgroundColor("#1b263b");


        // Nombre del lugar
        this.add.text(150, 40, "VALLE DEL PRIMER CUARZO", {
            fontSize: "40px",
            color: "#00ffff"
        });


        // Contador de cuarzos
        this.cuarzos = 0;

        this.textoCuarzos = this.add.text(20, 20, "💎 Cuarzos: 0/7", {
            fontSize: "25px",
            color: "#ffffff"
        });


        // Jugador temporal
        this.player = this.add.rectangle(
            400,
            300,
            50,
            70,
            0x00ff00
        );


        // Controles
        this.keys = this.input.keyboard.createCursorKeys();



        // =========================
        // PRIMER CUARZO MÁGICO
        // =========================

        this.alturaInicialCuarzo = 300;


        // Aura del cuarzo
        this.cuarzoBrillo = this.add.circle(
            600,
            300,
            45,
            0xff00ff,
            0.25
        );


        // Cristal principal
        this.cuarzo = this.add.circle(
            600,
            300,
            25,
            0xff00ff
        );


        // Animación del cristal
        this.tweens.add({

            targets: this.cuarzo,

            scale: 1.5,

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // Animación del aura
        this.tweens.add({

            targets: this.cuarzoBrillo,

            scale: 1.8,

            alpha: 0.1,

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });



        this.add.text(540, 350, "💎 Cuarzo", {
            fontSize: "20px",
            color: "#ffffff"
        });



        // Mensaje de misión
        this.add.text(180, 520, "Explora el valle y encuentra el primer cuarzo 💎", {
            fontSize: "25px",
            color: "#ffff00"
        });



        // Estado del cuarzo
        this.cuarzoEncontrado = false;

    }



    update() {


        let speed = 4;



        // Movimiento del jugador

        if (this.keys.left.isDown) {

            this.player.x -= speed;

        }


        if (this.keys.right.isDown) {

            this.player.x += speed;

        }


        if (this.keys.up.isDown) {

            this.player.y -= speed;

        }


        if (this.keys.down.isDown) {

            this.player.y += speed;

        }



        // Movimiento flotante del cuarzo

        if (this.cuarzo && !this.cuarzoEncontrado) {

            let movimiento =
            Math.sin(this.time.now / 300) * 10;


            this.cuarzo.y =
            this.alturaInicialCuarzo + movimiento;


            this.cuarzoBrillo.y =
            this.alturaInicialCuarzo + movimiento;

        }



        // Detectar recogida

        if (!this.cuarzoEncontrado) {


            let distancia = Phaser.Math.Distance.Between(

                this.player.x,

                this.player.y,

                this.cuarzo.x,

                this.cuarzo.y

            );



            if (distancia < 50) {


                this.cuarzoEncontrado = true;


                this.cuarzo.destroy();

                this.cuarzoBrillo.destroy();



                this.cuarzos = 1;


                this.textoCuarzos.setText(
                    "💎 Cuarzos: " + this.cuarzos + "/7"
                );



                this.add.text(150, 150,
                    "¡HAS ENCONTRADO EL PRIMER CUARZO!",
                    {
                        fontSize: "30px",
                        color: "#ffff00"
                    }
                );


            }

        }


    }

}
