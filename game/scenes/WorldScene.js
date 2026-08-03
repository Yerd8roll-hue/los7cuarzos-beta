export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // Fondo
        this.cameras.main.setBackgroundColor("#1a1a2e");

        // Título
        this.add.text(640, 40, "Valle del Cuarzo del Alma", {
            fontSize: "32px",
            color: "#00ffff"
        }).setOrigin(0.5);

        // Mostrar la imagen completa
        this.kael = this.add.image(640, 360, "kael");

        // Reducir el tamaño para que se vea completa
        this.kael.setScale(0.35);

    }

    update() {

    }

}
