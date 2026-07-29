class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#1b263b");

        this.add.text(150, 150, "VALLE DEL PRIMER CUARZO", {
            fontSize: "40px",
            color: "#00ffff"
        });

        this.add.text(250, 250, "MUNDO CARGADO", {
            fontSize: "30px",
            color: "#ffffff"
        });

    }
}

