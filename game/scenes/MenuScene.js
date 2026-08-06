export default class MenuScene extends Phaser.Scene {


    constructor() {

        super("MenuScene");

    }



    create() {


        console.log("MenuScene funcionando");


        this.cameras.main.setBackgroundColor("#050505");



        this.add.text(
            400,
            180,
            "LOS 7 CUARZOS",
            {
                fontSize:"48px",
                fontFamily:"Arial",
                color:"#00ffff"
            }
        )
        .setOrigin(0.5);



        const boton = this.add.text(
            400,
            330,
            "INICIO",
            {
                fontSize:"35px",
                fontFamily:"Arial",
                color:"#ffffff",
                backgroundColor:"#111111",
                padding:{
                    x:30,
                    y:15
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive();



        boton.on(
            "pointerover",
            ()=>{

                boton.setStyle({
                    color:"#00ffff"
                });

            }
        );



        boton.on(
            "pointerout",
            ()=>{

                boton.setStyle({
                    color:"#ffffff"
                });

            }
        );



        boton.on(
            "pointerdown",
            ()=>{

                console.log("Entrando al Valle del Alma");

                this.scene.start("WorldScene");

            }
        );


    }


}
  
