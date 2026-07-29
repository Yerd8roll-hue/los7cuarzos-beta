const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#111111",
    scene: {
        create: function () {
            this.add.text(200, 200, "LOS 7 CUARZOS FUNCIONA", {
                fontSize: "40px",
                color: "#00ffff"
            });
        }
    }
};

const game = new Phaser.Game(config);
