//=========================================
// FONDO VALLE DEL ALMA
//=========================================


this.sky = this.add.tileSprite(
    0,
    0,
    1280,
    720,
    "sky"
)
.setOrigin(0)
.setScrollFactor(0);



this.cityBack = this.add.tileSprite(
    0,
    0,
    1280,
    720,
    "cityBack"
)
.setOrigin(0)
.setScrollFactor(0);



this.cityFront = this.add.tileSprite(
    0,
    0,
    1280,
    720,
    "cityFront"
)
.setOrigin(0)
.setScrollFactor(0);



this.cables = this.add.tileSprite(
    0,
    0,
    1280,
    720,
    "cables"
)
.setOrigin(0)
.setScrollFactor(0);



//=========================================
// PISO DEL VALLE
//=========================================


this.floor = this.add.tileSprite(
    0,
    630,
    3000,
    100,
    "floor"
)
.setOrigin(0);



this.physics.add.existing(
    this.floor,
    true
);


    
