export function createKaelAnimations(scene) {

    const anims = scene.anims;

    anims.create({
        key: "kael-idle",
        frames: anims.generateFrameNumbers("kael", {
            start: 0,
            end: 7
        }),
        frameRate: 8,
        repeat: -1
    });

    anims.create({
        key: "kael-walk",
        frames: anims.generateFrameNumbers("kael", {
            start: 8,
            end: 15
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: "kael-run",
        frames: anims.generateFrameNumbers("kael", {
            start: 16,
            end: 25
        }),
        frameRate: 14,
        repeat: -1
    });

    anims.create({
        key: "kael-jump",
        frames: anims.generateFrameNumbers("kael", {
            start: 26,
            end: 30
        }),
        frameRate: 12,
        repeat: 0
    });

    anims.create({
        key: "kael-fall",
        frames: anims.generateFrameNumbers("kael", {
            start: 31,
            end: 34
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: "kael-land",
        frames: anims.generateFrameNumbers("kael", {
            start: 35,
            end: 38
        }),
        frameRate: 12,
        repeat: 0
    });

}
