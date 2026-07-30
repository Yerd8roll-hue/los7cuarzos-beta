
console.log("ESTE ES EL BOOTSCENE NUEVO");

class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload(){

        // PERSONAJES
        this.load.image(
            "kael",
            "imagenes/personajes/kael_vortex.png"
        );

        // CUARZOS
        this.load.image(
            "alma",
            "imagenes/cuarzos/alma.png"
        );

        // FONDOS
        this.load.image(
            "neoTerra",
            "imagenes/fondos/neo_terra.png"
        );

    }

    create() {

        this.cameras.main.setBackgroundColor("#050510");

        this.add.text(150,80,"LOS 7 CUARZOS",{
            fontSize:"55px",
            color:"#00ffff",
            fontStyle:"bold"
        });

        this.add.rectangle(400,330,420,300,0x111122)
            .setStrokeStyle(3,0x00ffff);

        let start=this.add.text(
            270,
            220,
            "▶ NUEVA PARTIDA",
            {
                fontSize:"32px",
                color:"#ffffff"
            }
        );

        start.setInteractive();

        start.on("pointerover",()=>{
            start.setColor("#00ffff");
        });

        start.on("pointerout",()=>{
            start.setColor("#ffffff");
        });

        start.on("pointerdown",()=>{
            this.scene.start("WorldScene");
        });

        let historia=this.add.text(
            310,
            300,
            "HISTORIA",
            {
                fontSize:"32px",
                color:"#ffffff"
            }
        );

        historia.setInteractive();

        historia.on("pointerdown",()=>{
            console.log("Historia");
        });

        let opciones=this.add.text(
            310,
            380,
            "OPCIONES",
            {
                fontSize:"32px",
                color:"#ffffff"
            }
        );

        opciones.setInteractive();

        opciones.on("pointerdown",()=>{
            console.log("Opciones");
        });

    }

}
