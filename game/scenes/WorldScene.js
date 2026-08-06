// ==================================
// CONFIGURACIÓN
// ==================================

const mundoAncho = 6400;
const anchoTira = 1280;



// ==================================
// SKY
// ==================================

for(let x = 0; x < mundoAncho; x += anchoTira){

    this.add.image(
        x,
        40,
        "sky"
    )
    .setOrigin(0)
    .setDisplaySize(1280,720)
    .setScrollFactor(0)
    .setDepth(0);

}



// ==================================
// CITY BACK
// ==================================

for(let x = 0; x < mundoAncho; x += anchoTira){

    this.add.image(
        x,
        40,
        "city_back"
    )
    .setOrigin(0)
    .setDisplaySize(1280,720)
    .setScrollFactor(0.2)
    .setDepth(1);

}



// ==================================
// CITY FRONT
// ==================================

for(let x = 0; x < mundoAncho; x += anchoTira){

    this.add.image(
        x,
        40,
        "city_front"
    )
    .setOrigin(0)
    .setDisplaySize(1280,720)
    .setScrollFactor(0.5)
    .setDepth(2);

}



// ==================================
// CABLES
// ==================================

for(let x = 0; x < mundoAncho; x += anchoTira){

    this.add.image(
        x,
        40,
        "cables"
    )
    .setOrigin(0)
    .setDisplaySize(1280,720)
    .setScrollFactor(0.7)
    .setDepth(3);

}



// ==================================
// FLOOR
// ==================================

for(let x = 0; x < mundoAncho; x += anchoTira){

    this.add.image(
        x,
        570,
        "floor"
    )
    .setOrigin(0)
    .setDisplaySize(1280,150)
    .setDepth(4);

}
   





