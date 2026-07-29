class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }


    create() {

        // Fondo del mundo
        this.cameras.main.setBackgroundColor("#080818");


        // Título
        this.add.text(150, 40, "VALLE DEL PRIMER CUARZO", {
            fontSize: "40px",
            color: "#00ffff"
        });



        // Contador de cuarzos
        this.cuarzos = 0;

        this.textoCuarzos = this.add.text(
            20,
            20,
            "💎 Cuarzos: 0/7",
            {
                fontSize: "25px",
                color: "#ffffff"
            }
        );



        // Jugador temporal
        this.player = this.add.rectangle(
            400,
            300,
            50,
            70,
            0x00ff00
        );


        // Teclado
        this.keys = this.input.keyboard.createCursorKeys();



        // =========================
        // PRIMER CUARZO LEGENDARIO
        // =========================


        this.cuarzoEncontrado = false;

        this.alturaInicialCuarzo = 300;



        // Aura del cuarzo
        this.cuarzoAura = this.add.circle(
            600,
            300,
            55,
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



        // Pulso del cristal
        this.tweens.add({

            targets: this.cuarzo,

            scale: 1.5,

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });



        // Pulso del aura
        this.tweens.add({

            targets: this.cuarzoAura,

            scale: 2,

            alpha: 0.1,

            duration: 1200,

            yoyo: true,

            repeat: -1

        });



        // Partículas de energía
        this.particulas = [];


        for(let i = 0; i < 15; i++) {

            let energia = this.add.circle(
                600,
                300,
                4,
                0xffffff
            );


            this.particulas.push(energia);

        }



        this.add.text(520, 350, "💎 Primer Cuarzo", {
            fontSize: "22px",
            color: "#ffffff"
        });



        // Mensaje inferior
        this.add.text(
            180,
            520,
            "Encuentra los 7 Cuarzos legendarios",
            {
                fontSize: "25px",
                color: "#ffff00"
            }
        );



        // Caja de historia
        this.historia = this.add.text(
            120,
            170,
            "",
            {
                fontSize: "25px",
                color: "#ffffff",
                backgroundColor: "#111122",
                padding: 10
            }
        );

    }




    update() {


        let speed = 4;



        // Movimiento jugador

        if(this.keys.left.isDown) {

            this.player.x -= speed;

        }


        if(this.keys.right.isDown) {

            this.player.x += speed;

        }


        if(this.keys.up.isDown) {

            this.player.y -= speed;

        }


        if(this.keys.down.isDown) {

            this.player.y += speed;

        }




        // Movimiento mágico del cuarzo

        if(this.cuarzo && !this.cuarzoEncontrado) {


            let movimiento =
            Math.sin(this.time.now / 300) * 10;


            this.cuarzo.y =
            this.alturaInicialCuarzo + movimiento;


            this.cuarzoAura.y =
            this.alturaInicialCuarzo + movimiento;



            // Movimiento partículas

            this.particulas.forEach((p, i) => {

                let angulo =
                this.time.now / 500 + i;


                p.x =
                600 + Math.cos(angulo) * 70;


                p.y =
                this.cuarzo.y + Math.sin(angulo) * 70;


            });

        }




        // Recoger cuarzo

        if(!this.cuarzoEncontrado) {


            let distancia =
            Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.cuarzo.x,
                this.cuarzo.y
            );



            if(distancia < 50) {


                this.cuarzoEncontrado = true;


                this.cuarzo.destroy();

                this.cuarzoAura.destroy();



                this.cuarzos = 1;



                this.textoCuarzos.setText(
                    "💎 Cuarzos: " + this.cuarzos + "/7"
                );



                this.historia.setText(
                    "PRIMER CUARZO DESPERTADO\n\n" +
                    "El cristal antiguo reconoce\n" +
                    "al nuevo portador.\n\n" +
                    "Poder obtenido:\n✨ Energía del alma"
                );

            }

        }


    }

}

    
