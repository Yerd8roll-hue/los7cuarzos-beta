
import { createKaelAnimations } from "../animations/KaelAnimations.js";

export default class WorldScene extends Phaser.Scene {

    constructor() {
        super("WorldScene");
    }

    create() {

        // =========================================
        // COLOR DE FONDO
        // =========================================

        this.cameras.main.setBackgroundColor("#05070d");


        // =========================================
        // 🎵 MUSICA DEL VALLE
        // =========================================

        this.musicaValle = this.sound.add(
            "musica-valle",
            {
                volume: 0.35,
                loop: false
            }
        );

        this.musicaValle.play();


        // =========================================
        // FIN DE LA CANCION
        // =========================================

        this.musicaValle.once(
            "complete",
            () => {

                this.finalizarValle();

            }
        );


        // =========================================
        // MUNDO
        // =========================================

        const mundoAncho = 3000;

        this.physics.world.setBounds(
            0,
            0,
            mundoAncho,
            720
        );


        // =========================================
        // SKY
        // =========================================

        this.sky = this.add.image(
            0,
            0,
            "sky"
        );

        this.sky
            .setOrigin(0, 0)
            .setDepth(0)
            .setScrollFactor(0);


        // =========================================
        // CABLES
        // =========================================

        this.cables = this.add.image(
            0,
            0,
            "cables"
        );

        this.cables
            .setOrigin(0, 0)
            .setDepth(2);


        // =========================================
        // PUNTO DEL CUARZO
        // =========================================

        this.puntoCuarzo = 1672;

        this.eventoCuarzoActivo = false;


        // =========================================
        // FLOOR VISUAL
        // =========================================

        this.floorImage = this.add.image(
            0,
            570,
            "floor"
        );

        this.floorImage
            .setOrigin(0, 0)
            .setDisplaySize(
                mundoAncho,
                150
            )
            .setDepth(3);


        // =========================================
        // PISO FISICO
        // =========================================

        this.ground = this.add.rectangle(
            mundoAncho / 2,
            650,
            mundoAncho,
            50,
            0x000000,
            0
        );

        this.physics.add.existing(
            this.ground,
            true
        );


        // =========================================
        // 🌌 AURA DEL TITULO
        // =========================================

        const auraTitulo = this.add.circle(
            640,
            120,
            85,
            0x9b00ff,
            0.06
        );

        auraTitulo
            .setScrollFactor(0)
            .setDepth(19)
            .setAlpha(0);


        // =========================================
        // 🌌 TITULO
        // =========================================

        const tituloValle = this.add.text(
            640,
            120,
            "VALLE DEL CUARZO\nDEL ALMA",
            {
                fontSize: "30px",
                fontStyle: "normal",
                color: "#e8e8ff",
                stroke: "#7b4cff",
                strokeThickness: 2,
                align: "center",

                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: "#9b00ff",
                    blur: 12,
                    stroke: true,
                    fill: true
                }
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(20)
        .setAlpha(0)
        .setScale(0.96);


        // =========================================
        // ✨ ENTRADA DEL TITULO
        // =========================================

        this.tweens.add({

            targets: tituloValle,

            alpha: 1,
            scale: 1,

            duration: 1800,

            ease: "Sine.easeOut"

        });


        // =========================================
        // AURA RESPIRANDO
        // =========================================

        this.tweens.add({

            targets: auraTitulo,

            alpha: {
                from: 0,
                to: 0.18
            },

            scale: {
                from: 0.8,
                to: 1.15
            },

            duration: 2200,

            yoyo: true,

            repeat: 3,

            ease: "Sine.easeInOut"

        });


        // =========================================
        // 🌫️ DESAPARECER TITULO
        // =========================================

        this.time.delayedCall(
            10000,
            () => {

                this.tweens.add({

                    targets: [
                        tituloValle,
                        auraTitulo
                    ],

                    alpha: 0,

                    duration: 1800,

                    ease: "Sine.easeInOut",

                    onComplete: () => {

                        tituloValle.destroy();

                        auraTitulo.destroy();

                    }

                });

            }
        );


        // =========================================
        // KAEL
        // =========================================

        createKaelAnimations(this);

        this.kael = this.physics.add.sprite(
            200,
            450,
            "kael"
        );

        this.kael.setDepth(5);

        this.kael.setBounce(0);

        this.kael.setCollideWorldBounds(true);


        this.physics.add.collider(
            this.kael,
            this.ground
        );


        // =========================================
        // 🔋 ENERGIA DE KAEL
        // =========================================

        this.energiaMaxima = 100;

        this.energiaKael = 77;

        // Cada salto consume 10
        this.costoSalto = 10;

        // Solo recarga hasta 70
        this.energiaMaxRecarga = 70;

        // Velocidad de recuperación
        this.velocidadRecarga = 10;

        // Control del brillo
        this.brilloEnergiaActivo = false;


        // =========================================
        // 🛼 VELOCIDADES SEGUN ENERGIA
        // =========================================

        this.velocidadNormal = 180;

        this.velocidadMedia = 150;

        this.velocidadBaja = 110;

        this.velocidadCritica = 70;


        // =========================================
        // MARCO DE LA BARRA
        // =========================================

        this.barraEnergiaMarco =
            this.add.graphics();

        this.barraEnergiaMarco
            .setScrollFactor(0)
            .setDepth(50);


        // =========================================
        // FONDO DE LA BARRA
        // =========================================

        this.barraEnergiaFondo =
            this.add.graphics();

        this.barraEnergiaFondo
            .setScrollFactor(0)
            .setDepth(50);


        // =========================================
        // RELLENO
        // =========================================

        this.barraEnergia =
            this.add.graphics();

        this.barraEnergia
            .setScrollFactor(0)
            .setDepth(51);


        // =========================================
        // TEXTO
        // =========================================

        this.textoEnergia =
            this.add.text(
                55,
                38,
                "ENERGÍA  77 / 100",
                {
                    fontSize: "17px",
                    fontStyle: "bold",
                    color: "#d9ffff",

                    stroke: "#061316",
                    strokeThickness: 4,

                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: "#00ffff",
                        blur: 8,
                        stroke: true,
                        fill: true
                    }
                }
            )
            .setScrollFactor(0)
            .setDepth(52);


        // =========================================
        // DIBUJAR BARRA
        // =========================================

        this.actualizarBarraEnergia();


        // =========================================
        // ✨ PULSO DE LA BARRA
        // =========================================

        this.tweens.add({

            targets: this.barraEnergia,

            alpha: {
                from: 0.88,
                to: 1
            },

            duration: 900,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // =========================================
        // CAMARA
        // =========================================

        this.cameras.main.startFollow(
            this.kael,
            true
        );

        this.cameras.main.setBounds(
            0,
            0,
            mundoAncho,
            720
        );


        // =========================================
        // CONTROLES
        // =========================================

        this.cursors =
            this.input.keyboard.createCursorKeys();


        this.keys =
            this.input.keyboard.addKeys({

                A: Phaser.Input.Keyboard.KeyCodes.A,

                D: Phaser.Input.Keyboard.KeyCodes.D,

                SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE

            });


        // =========================================
        // ⚡ EVENTO DE LOS 7 PULSOS
        // =========================================

        this.activarCuarzo = () => {

            if (this.eventoCuarzoActivo) {
                return;
            }

            this.eventoCuarzoActivo = true;


            for (let i = 0; i < 7; i++) {

                this.time.delayedCall(
                    i * 650,
                    () => {

                        const pulso = this.add.circle(
                            this.puntoCuarzo,
                            330,
                            45,
                            0x00ffff,
                            0
                        );

                        pulso.setStrokeStyle(
                            8,
                            0x00ffff,
                            1
                        );

                        pulso.setDepth(8);

                        pulso.setScale(0.2);


                        this.tweens.add({

                            targets: pulso,

                            scale: 4,

                            alpha: 0,

                            duration: 1000,

                            ease: "Cubic.easeOut",

                            onComplete: () => {

                                pulso.destroy();

                            }

                        });

                    }
                );

            }


            // =====================================
            // 💎 CUARZO DEL ALMA
            // =====================================

            this.time.delayedCall(
                7 * 650 + 1000,
                () => {

                    const cuarzo = this.add.circle(
                        this.puntoCuarzo,
                        330,
                        50,
                        0x9b00ff,
                        1
                    );

                    cuarzo.setDepth(9);


                    this.tweens.add({

                        targets: cuarzo,

                        scale: {
                            from: 0.6,
                            to: 1.3
                        },

                        alpha: {
                            from: 0.5,
                            to: 1
                        },

                        duration: 700,

                        yoyo: true,

                        repeat: -1,

                        ease: "Sine.easeInOut"

                    });

                }
            );

        };

    }


    // =============================================
    // 🔋 ACTUALIZAR BARRA
    // =============================================

    actualizarBarraEnergia() {

        const x = 55;
        const y = 65;

        const ancho = 245;
        const alto = 22;

        const porcentaje =
            this.energiaKael /
            this.energiaMaxima;


        this.barraEnergiaMarco.clear();

        this.barraEnergiaFondo.clear();

        this.barraEnergia.clear();


        // =========================================
        // MARCO
        // =========================================

        this.barraEnergiaMarco.fillStyle(
            0x071316,
            0.95
        );

        this.barraEnergiaMarco.fillRoundedRect(
            x - 6,
            y - 6,
            ancho + 12,
            alto + 12,
            8
        );


        // =========================================
        // BORDE CYAN
        // =========================================

        this.barraEnergiaMarco.lineStyle(
            2,
            0x00ffff,
            0.9
        );

        this.barraEnergiaMarco.strokeRoundedRect(
            x - 6,
            y - 6,
            ancho + 12,
            alto + 12,
            8
        );


        // =========================================
        // FONDO
        // =========================================

        this.barraEnergiaFondo.fillStyle(
            0x06191b,
            1
        );

        this.barraEnergiaFondo.fillRoundedRect(
            x,
            y,
            ancho,
            alto,
            5
        );


        // =========================================
        // ENERGIA
        // =========================================

        const anchoEnergia =
            ancho * porcentaje;


        if (anchoEnergia > 0) {

            this.barraEnergia.fillStyle(
                0x00ff88,
                1
            );

            this.barraEnergia.fillRoundedRect(
                x,
                y,
                anchoEnergia,
                alto,
                5
            );


            // CYAN

            this.barraEnergia.fillStyle(
                0x00ffff,
                0.55
            );

            this.barraEnergia.fillRoundedRect(
                x + 3,
                y + 3,
                Math.max(
                    0,
                    anchoEnergia - 6
                ),
                alto - 6,
                3
            );


            // BRILLO

            this.barraEnergia.fillStyle(
                0xffffff,
                0.30
            );

            this.barraEnergia.fillRoundedRect(
                x + 4,
                y + 3,
                Math.max(
                    0,
                    anchoEnergia - 8
                ),
                4,
                2
            );

        }


        // =========================================
        // NUMERO
        // =========================================

        this.textoEnergia.setText(
            "ENERGÍA  " +
            Math.floor(this.energiaKael) +
            " / " +
            this.energiaMaxima
        );

    }


    // =============================================
    // ✨ BRILLO DE KAEL
    // =============================================

    brilloKaelEnergia() {

        if (!this.kael) {
            return;
        }

        if (this.brilloEnergiaActivo) {
            return;
        }

        this.brilloEnergiaActivo = true;


        const escalaOriginalX =
            this.kael.scaleX;

        const escalaOriginalY =
            this.kael.scaleY;


        // =========================================
        // TINTE CYAN
        // =========================================

        this.kael.setTint(
            0x66ffff
        );


        // =========================================
        // PULSO
        // =========================================

        this.tweens.add({

            targets: this.kael,

            scaleX:
                escalaOriginalX * 1.12,

            scaleY:
                escalaOriginalY * 1.12,

            duration: 180,

            yoyo: true,

            ease: "Sine.easeOut"

        });


        // =========================================
        // AURA
        // =========================================

        const aura =
            this.add.circle(
                this.kael.x,
                this.kael.y,
                28,
                0x00ffff,
                0.18
            );


        aura
            .setScrollFactor(1)
            .setDepth(4);


        this.tweens.add({

            targets: aura,

            scale: 2.4,

            alpha: 0,

            duration: 500,

            ease: "Cubic.easeOut",

            onUpdate: () => {

                if (this.kael) {

                    aura.x =
                        this.kael.x;

                    aura.y =
                        this.kael.y;

                }

            },

            onComplete: () => {

                aura.destroy();

            }

        });


        // =========================================
        // QUITAR TINTE
        // =========================================

        this.time.delayedCall(
            450,
            () => {

                if (this.kael) {

                    this.kael.clearTint();

                }

                this.brilloEnergiaActivo = false;

            }
        );

    }


    // =============================================
    // 💥 FINAL DEL VALLE
    // =============================================

    finalizarValle() {

        if (this.finalizando) {
            return;
        }

        this.finalizando = true;


        // =========================================
        // DETENER MOVIMIENTO
        // =========================================

        if (this.kael) {

            this.kael.setVelocity(
                0,
                0
            );

            this.kael.body.enable = false;

        }


        // =========================================
        // ⚡ DESTELLO
        // =========================================

        const destello = this.add.rectangle(
            640,
            360,
            1280,
            720,
            0xffffff,
            0
        );

        destello
            .setScrollFactor(0)
            .setDepth(100);


        this.tweens.add({

            targets: destello,

            alpha: 0.9,

            duration: 160,

            yoyo: true,

            ease: "Quad.easeOut"

        });


        // =========================================
        // 💥 FRAGMENTOS
        // =========================================

        const fragmentos = [];

        const colores = [

            0x00ffff,
            0x9b00ff,
            0x0066ff,
            0xff1744,
            0x00ff88,
            0xffd700,
            0xff66cc,
            0x7b4cff

        ];


        for (let i = 0; i < 150; i++) {

            const ancho =
                Phaser.Math.Between(
                    15,
                    110
                );

            const alto =
                Phaser.Math.Between(
                    10,
                    75
                );


            const x =
                Phaser.Math.Between(
                    -50,
                    1330
                );

            const y =
                Phaser.Math.Between(
                    -40,
                    760
                );


            const color =
                Phaser.Utils.Array.GetRandom(
                    colores
                );


            const fragmento =
                this.add.rectangle(
                    x,
                    y,
                    ancho,
                    alto,
                    color,
                    Phaser.Math.FloatBetween(
                        0.55,
                        0.95
                    )
                );


            fragmento
                .setScrollFactor(0)
                .setDepth(101);


            if (i % 4 === 0) {

                fragmento.setStrokeStyle(
                    2,
                    0xffffff,
                    0.45
                );

            }


            fragmentos.push(
                fragmento
            );


            const destinoX =
                x +
                Phaser.Math.Between(
                    -700,
                    700
                );


            const destinoY =
                y +
                Phaser.Math.Between(
                    -550,
                    550
                );


            this.tweens.add({

                targets: fragmento,

                x: destinoX,

                y: destinoY,

                angle:
                    Phaser.Math.Between(
                        -360,
                        360
                    ),

                scaleX:
                    Phaser.Math.FloatBetween(
                        0.05,
                        0.25
                    ),

                scaleY:
                    Phaser.Math.FloatBetween(
                        0.05,
                        0.25
                    ),

                alpha: 0,

                duration:
                    Phaser.Math.Between(
                        1100,
                        1900
                    ),

                delay:
                    Phaser.Math.Between(
                        0,
                        350
                    ),

                ease: "Cubic.easeIn"

            });

        }


        // =========================================
        // 🌌 DESAPARECER EL MUNDO
        // =========================================

        const elementosMundo = [

            this.sky,
            this.cables,
            this.floorImage

        ].filter(
            elemento => elemento
        );


        this.tweens.add({

            targets: elementosMundo,

            alpha: 0,

            scaleX: 1.04,

            scaleY: 1.04,

            duration: 1500,

            ease: "Cubic.easeIn"

        });


        // =========================================
        // 🟪 KAEL SE FRAGMENTA
        // =========================================

        if (this.kael) {

            this.tweens.add({

                targets: this.kael,

                alpha: 0,

                scale: 0.15,

                angle: 360,

                duration: 1100,

                ease: "Cubic.easeIn"

            });

        }


        // =========================================
        // 🌑 OSCURECER
        // =========================================

        const negro =
            this.add.rectangle(
                640,
                360,
                1280,
                720,
                0x05070d,
                0
            );

        negro
            .setScrollFactor(0)
            .setDepth(105);


        this.tweens.add({

            targets: negro,

            alpha: 0.35,

            duration: 1300,

            ease: "Sine.easeInOut"

        });


        // =========================================
        // 🌟 FLASH FINAL
        // =========================================

        this.time.delayedCall(
            1900,
            () => {

                const flashBlanco =
                    this.add.rectangle(
                        640,
                        360,
                        1280,
                        720,
                        0xffffff,
                        0
                    );

                flashBlanco
                    .setScrollFactor(0)
                    .setDepth(200);


                this.tweens.add({

                    targets: flashBlanco,

                    alpha: 1,

                    duration: 180,

                    ease: "Quad.easeOut",

                    onComplete: () => {

                        flashBlanco.setFillStyle(
                            0xffd966,
                            1
                        );


                        this.tweens.add({

                            targets: flashBlanco,

                            duration: 220,

                            ease: "Sine.easeInOut",

                            onComplete: () => {

                                flashBlanco.setFillStyle(
                                    0xffffff,
                                    1
                                );


                                this.tweens.add({

                                    targets: flashBlanco,

                                    duration: 160,

                                    ease: "Sine.easeOut",

                                    onComplete: () => {

                                        this.tweens.add({

                                            targets: flashBlanco,

                                            alpha: 0,

                                            duration: 450,

                                            ease: "Sine.easeInOut",

                                            onComplete: () => {

                                                flashBlanco.destroy();

                                                negro.destroy();

                                                destello.destroy();


                                                if (
                                                    this.musicaValle
                                                ) {

                                                    this.musicaValle.stop();

                                                    this.musicaValle.destroy();

                                                    this.musicaValle = null;

                                                }


                                                this.scene.start(
                                                    "MenuScene"
                                                );

                                            }

                                        });

                                    }

                                });

                            }

                        });

                    }

                });

            }
        );

    }


    // =============================================
    // UPDATE
    // =============================================

    update(time, delta) {

        if (this.finalizando) {
            return;
        }


        // =========================================
        // 🛼 VELOCIDAD SEGUN ENERGIA
        // =========================================

        let velocidadActual;


        if (this.energiaKael >= 70) {

            velocidadActual =
                this.velocidadNormal;

        }

        else if (this.energiaKael >= 30) {

            velocidadActual =
                this.velocidadMedia;

        }

        else if (this.energiaKael >= 10) {

            velocidadActual =
                this.velocidadBaja;

        }

        else {

            velocidadActual =
                this.velocidadCritica;

        }


        // =========================================
        // MOVIMIENTO KAEL
        // =========================================

        if (
            this.keys.A.isDown ||
            this.cursors.left.isDown
        ) {

            this.kael.setVelocityX(
                -velocidadActual
            );

            this.kael.setFlipX(
                true
            );

        }

        else if (
            this.keys.D.isDown ||
            this.cursors.right.isDown
        ) {

            this.kael.setVelocityX(
                velocidadActual
            );

            this.kael.setFlipX(
                false
            );

        }

        else {

            this.kael.setVelocityX(
                0
            );

        }


        // =========================================
        // 🛼 SALTO + CONSUMO
        // =========================================

        if (
            (
                this.keys.SPACE.isDown ||
                this.cursors.up.isDown
            )
            &&
            this.kael.body.blocked.down
            &&
            this.energiaKael >= this.costoSalto
        ) {

            this.energiaKael -=
                this.costoSalto;


            if (this.energiaKael < 0) {

                this.energiaKael = 0;

            }


            this.actualizarBarraEnergia();


            this.kael.setVelocityY(
                -500
            );

        }


        // =========================================
        // 🔋 RECARGA
        // SOLO QUIETO EN EL SUELO
        // =========================================

        if (
            this.kael.body.blocked.down &&
            this.kael.body.velocity.x === 0 &&
            this.energiaKael < this.energiaMaxRecarga
        ) {

            const energiaAnterior =
                this.energiaKael;


            this.energiaKael +=
                this.velocidadRecarga *
                (delta / 1000);


            if (
                this.energiaKael >
                this.energiaMaxRecarga
            ) {

                this.energiaKael =
                    this.energiaMaxRecarga;

            }


            if (
                this.energiaKael !==
                energiaAnterior
            ) {

                this.actualizarBarraEnergia();

            }


            // =====================================
            // ✨ LLEGÓ A 70
            // =====================================

            if (
                energiaAnterior <
                this.energiaMaxRecarga
                &&
                this.energiaKael >=
                this.energiaMaxRecarga
            ) {

                this.energiaKael =
                    this.energiaMaxRecarga;

                this.actualizarBarraEnergia();

                this.brilloKaelEnergia();

            }

        }


        // =========================================
        // ⚡ LLEGADA AL CUARZO
        // =========================================

        if (
            this.kael.x >=
            this.puntoCuarzo - 250
        ) {

            this.activarCuarzo();

        }

    }

}

