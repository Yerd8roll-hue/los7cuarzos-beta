class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // Fondo del mundo
        this.cameras.main.setBackgroundColor("#1b263b");

        // Título de la zona
        this.add.text(180, 80, "VALLE DEL PRIMER CUARZO", {
            fontSize: "40px",
            color: "#00ffff"
        });

        // Personaje temporal
        this.add.rectangle(400, 300, 50, 70, 0x00ff00);

        this.add.text(320, 400, "HÉROE INICIAL", {
            fontSize: "25px",
            color: "#ffffff"
        });

        // Misión
        this.add.text(150, 500, "Encuentra el primer cuarzo...", {
            fontSize: "25px",
            color: "#ffff00"
        });

    }
}
