class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }


    create() {

        // Fondo
        this.cameras.main.setBackgroundColor("#080818");


        // Título
        this.add.text(120, 40, "VALLE DEL CUARZO DEL ALMA", {
            fontSize: "38px",
            color: "#00ffff"
        });



        // Contador

        this.cuarzos = 0;

        this.textoCuarzos = this.add.text(
            20,
            20,
            "💎 Cuarzos: 0/7",
            {
                fontSize: "25px",
                color:"#ffffff"
            }
        );



        // =====================
        // PERSONAJE
        // =====================

        this.player = this.add.rectangle(
            400,
            300,
            50,
            70,
            0x00ff00
        );


        this.keys = this.input.keyboard.createCursorKeys();



        // Aura del personaje (apagada al inicio)

        this.auraJugador = this.add.circle(
            400,
            300,
            50,
            0xff00ff,
            0
        );



        this.tweens.add({

            targets:this.auraJugador,

            scale:1.4,

            alpha:0.2,

            duration:900,

            yoyo:true,

            repeat:-1

        });



        // =====================
        // CUARZO DEL ALMA
        // =====================


        this.cuarzoEncontrado = false;


        this.alturaCuarzo = 300;



        // Aura del cuarzo

        this.cuarzoAura = this.add.circle(
            600,
            300,
            60,
            0xff00ff,
            0.25
        );



        // Cristal

        this.cuarzo = this.add.circle(
            600,
            300,
            28,
            0xff00ff
        );



        // Brillo del cuarzo

        this.tweens.add({

            targets:this.cuarzo,

            scale:1.5,

            duration:1000,

            yoyo:true,

            repeat:-1,

            ease:"Sine.easeInOut"

        });



        this.tweens.add({

            targets:this.cuarzoAura,

            scale:2,

            alpha:0.1,

            duration:1200,

            yoyo:true,

            repeat:-1

        });



        // Partículas

        this.particulas = [];


        for(let i=0;i<20;i++){

            let energia = this.add.circle(
                600,
                300,
                4,
                0xffffff
            );


            this.particulas.push(energia);

        }



        this.add.text(
            510,
            360,
            "💎 Cuarzo del Alma",
            {
                fontSize:"22px",
                color:"#ffffff"
            }
        );



        // Mensaje historia

        this.historia = this.add.text(
            100,
            160,
            "",
            {
                fontSize:"25px",
                color:"#ffffff",
                backgroundColor:"#111122",
                padding:10
            }
        );

    }



    update(){


        let speed = 4;



        // Movimiento jugador

        if(this.keys.left.isDown)
            this.player.x -= speed;


        if(this.keys.right.isDown)
            this.player.x += speed;


        if(this.keys.up.isDown)
            this.player.y -= speed;


        if(this.keys.down.isDown)
            this.player.y += speed;



        // Aura sigue al jugador

        this.auraJugador.x = this.player.x;
        this.auraJugador.y = this.player.y;



        // Movimiento del cuarzo

        if(this.cuarzo && !this.cuarzoEncontrado){


            let movimiento =
            Math.sin(this.time.now/300)*10;


            this.cuarzo.y =
            this.alturaCuarzo + movimiento;


            this.cuarzoAura.y =
            this.alturaCuarzo + movimiento;



            this.particulas.forEach((p,i)=>{


                let angulo =
                this.time.now/500+i;


                p.x =
                600 + Math.cos(angulo)*75;


                p.y =
                this.cuarzo.y +
                Math.sin(angulo)*75;


            });

        }



        // Recoger cuarzo

        if(!this.cuarzoEncontrado){


            let distancia =
            Phaser.Math.Distance.Between(

                this.player.x,
                this.player.y,

                this.cuarzo.x,
                this.cuarzo.y

            );



            if(distancia < 55){


                this.cuarzoEncontrado = true;


                this.cuarzo.destroy();

                this.cuarzoAura.destroy();



                this.cuarzos = 1;


                this.textoCuarzos.setText(
                    "💎 Cuarzos: 1/7"
                );



                // Activar energía violeta

                this.auraJugador.setFillStyle(
                    0xff00ff,
                    0.35
                );



                this.historia.setText(
                    "💎 CUARZO DEL ALMA DESPERTADO\n\n"+
                    "El cristal ha elegido a su portador.\n\n"+
                    "Poder obtenido:\n"+
                    "🟣 Energía espiritual"
                );


            }

        }


    }

}


       


    
    
        
