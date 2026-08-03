export function createKaelAnimations(scene) {

    scene.anims.create({
        key: "kael-idle",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 0,
            end: 5
        }),
        frameRate: 8,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-walk",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 6,
            end: 13
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-run",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 14,
            end: 21
        }),
        frameRate: 14,
        repeat: -1
    });

    scene.anims.create({
        key: "kael-jump",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 22,
            end: 25
        }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: "kael-fall",
        frames: scene.anims.generateFrameNumbers("kael", {
            start: 26,
            end: 29
        }),
        frameRate: 10,
        repeat: -1
    });

}
