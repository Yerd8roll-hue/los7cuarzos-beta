class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#1b263b");

        this.add.text(150, 50, "VALLE DEL PRIMER CUARZO", {
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

        // Teclas
        this.keys = this.input.keyboard.createCursorKeys();

        this.add.text(250, 500, "Busca el primer cuarzo 💎", {
            fontSize: "25px",
            color: "#ffff00"
        });

    }

    update() {

        let speed = 3;

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
