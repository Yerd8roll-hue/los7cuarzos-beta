class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // Fondo
        this.cameras.main.setBackgroundColor("#1b263b");


        // Nombre del lugar
        this.add.text(150, 40, "VALLE DEL PRIMER CUARZO", {
            fontSize: "40px",
            color: "#00ffff"
        });


        // Jugador
        this.player = this.add.rectangle(
            400,
            300,
            50,
            70,
            0x00ff00
        );


        // Controles
        this.keys = this.input.keyboard.createCursorKeys();


        // Texto de misión
        this.add.text(180, 520, "Explora el valle y encuentra el cuarzo 💎", {
            fontSize: "25px",
            color: "#ffff00"
        });

    }


    update() {

        let speed = 4;


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

    }

}
