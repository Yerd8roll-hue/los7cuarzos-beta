export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#1a1a2e");

        this.add.text(640, 40, "Valle del Cuarzo del Alma", {
            fontSize: "32px",
            color: "#00ffff"
        }).setOrigin(0.5);

        console.log("¿Existe kael?", this.textures.exists("kael"));

        const imagen = this.add.image(640, 360, "kael");

        imagen.setScale(0.35);

    }

    update() {

    }

}
