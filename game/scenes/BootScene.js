class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    create() {

        // Título
        this.add.text(180, 80, "LOS 7 CUARZOS", {
            fontSize: "50px",
            color: "#00ffff"
        });

        // Botón Nueva Partida
        let start = this.add.text(260, 220, "▶ NUEVA PARTIDA", {
            fontSize: "30px",
            color: "#ffffff"
        });

        start.setInteractive();

        start.on("pointerover", () => {
            start.setColor("#00ffff");
        });

        start.on("pointerout", () => {
            start.setColor("#ffffff");
        });

        start.on("pointerdown", () => {
            console.log("Iniciando aventura...");
        });


        // Historia
        let historia = this.add.text(290, 300, "📖 HISTORIA", {
            fontSize: "30px",
            color: "#ffffff"
        });

        historia.setInteractive();

        historia.on("pointerdown", () => {
            console.log("Abriendo historia...");
        });


        // Opciones
        let opciones = this.add.text(300, 380, "⚙ OPCIONES", {
            fontSize: "30px",
            color: "#ffffff"
        });

        opciones.setInteractive();

        opciones.on("pointerdown", () => {
            console.log("Opciones...");
        });

    }
}
