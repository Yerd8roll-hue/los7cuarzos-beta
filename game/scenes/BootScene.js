class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    create() {
        this.add.text(200, 200, "LOS 7 CUARZOS", {
            fontSize: "40px",
            color: "#00ffff"
        });
    }
}
