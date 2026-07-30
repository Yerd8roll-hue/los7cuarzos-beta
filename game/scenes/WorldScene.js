

       


    class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }


    create() {

this.player = this.add.image(
    400,
    300,
    "kael"
);

this.player.setScale(0.35);
this.player.setDepth(2);
        // Título

        this.add.text(120, 40, "VALLE DEL CUARZO DEL ALMA", {
            fontSize: "38px",
            color: "#00ffff"
        });



        // Contador

this.player = this.add.image(
    400,
    300,
    "kael"
);

this.player.setScale(0.35);
this.player.setDepth(2);
       

        // =====================
        // PERSONAJE
        // =====================

        this.player = this.add.image(
    400,
    300,
    "kael"
);

this.player.setScale(0.35);
this.player.setDepth(2);


        this.keys = this.input.keyboard.createCursorKeys();



        // Aquí NO creamos aura todavía
        this.auraJugador = null;



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



        // Animación del cuarzo

        this.tweens.add({

            targets:this.cuarzo,

            scale:1.5,

            duration:1000,

            yoyo:true,

            repeat:-1,

            ease:"Sine.easeInOut"

        });



        // Animación aura del cuarzo

        this.tweens.add({

            targets:this.cuarzoAura,

            scale:2,

            alpha:0.1,

            duration:1200,

            yoyo:true,

            repeat:-1

        });



        // Partículas del cuarzo

        this.particulas = [];


        for(let i = 0; i < 20; i++){

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



        // Historia

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

        if(this.keys.left.isDown){
            this.player.x -= speed;
        }


        if(this.keys.right.isDown){
            this.player.x += speed;
        }


        if(this.keys.up.isDown){
            this.player.y -= speed;
        }


        if(this.keys.down.isDown){
            this.player.y += speed;
        }



        // Si ya despertó el poder,
        // el aura sigue al jugador

        if(this.auraJugador){

            this.auraJugador.x = this.player.x;
            this.auraJugador.y = this.player.y;

        }





        // Movimiento del cuarzo

        if(this.cuarzo && !this.cuarzoEncontrado){


            let movimiento =
            Math.sin(this.time.now / 300) * 10;


            this.cuarzo.y =
            this.alturaCuarzo + movimiento;


            this.cuarzoAura.y =
            this.alturaCuarzo + movimiento;



            this.particulas.forEach((p,i)=>{

                let angulo =
                this.time.now / 500 + i;


                p.x =
                600 + Math.cos(angulo) * 75;


                p.y =
                this.cuarzo.y +
                Math.sin(angulo) * 75;


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



                // =====================
                // DESPERTAR DEL CUARZO
                // =====================


                this.auraJugador = this.add.circle(
                    this.player.x,
                    this.player.y,
                    55,
                    0xff00ff,
                    0.5
                );


                this.auraJugador.setDepth(1);
                this.player.setDepth(2);



                this.tweens.add({

                    targets:this.auraJugador,

                    scale:1.7,

                    alpha:0.3,

                    duration:700,

                    yoyo:true,

                    repeat:-1

                });



                // Explosión de energía

                let energia = this.add.circle(
                    this.player.x,
                    this.player.y,
                    20,
                    0xff00ff,
                    0.8
                );



                this.tweens.add({

                    targets:energia,

                    scale:5,

                    alpha:0,

                    duration:800,

                    onComplete:()=>{

                        energia.destroy();

                    }

                });



                this.historia.setText(

                    "💎 CUARZO DEL ALMA DESPERTADO\n\n"+
                    "El cristal ha elegido al portador.\n\n"+
                    "Poder obtenido:\n"+
                    "🟣 Energía espiritual"

                );


            }

        }


    }

}
    
        
