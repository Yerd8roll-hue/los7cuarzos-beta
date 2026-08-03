export function createKaelAnimations(scene) {

    scene.anims.create({
        key: "kael-idle",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 0,
            end: 7
        }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-walk",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 8,
            end: 15
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-run",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 16,
            end: 25
        }),
        frameRate: 14,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-jump",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 26,
            end: 30
        }),
        frameRate: 12,
        repeat: 0
    });

    scene.anims.create({
        key: "kael-fall",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 31,
            end: 34
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-land",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 35,
            end: 38
        }),
        frameRate: 12,
        repeat: 0
    });

}
