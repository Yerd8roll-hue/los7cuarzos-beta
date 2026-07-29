const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#111111",
    scene: [BootScene, WorldScene]
};

const game = new Phaser.Game(config);
