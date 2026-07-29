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


        // Primer Cuarzo
        this.cuarzo = this.add.rectangle(
            600,
            300,
            35,
            35,
            0xff00ff
        );


        this.add.text(540, 350, "💎 Cuarzo", {
            fontSize: "20px",
            color: "#ffffff"
        });


        // Mensaje de misión
        this.add.text(180, 520, "Explora el valle y encuentra el primer cuarzo 💎", {
            fontSize: "25px",
            color: "#ffff00"
        });


        // Variable para saber si ya fue recogido
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


        // Detectar contacto con el cuarzo

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


                this.add.text(150, 150, "¡HAS ENCONTRADO EL PRIMER CUARZO!", {
                    fontSize: "30px",
                    color: "#ffff00"
                });

            }

        }

    }

}
