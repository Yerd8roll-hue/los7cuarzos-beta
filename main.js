game/
const config = {

type: Phaser.AUTO,

width:1280,

height:720,

backgroundColor:"#050510",

scene:{

preload:preload,

create:create,

update:update

}

};

const game=new Phaser.Game(config);

function preload(){

}

function create(){

this.add.text(

350,

330,

"LOS 7 CUARZOS\nMotor iniciado",

{

fontSize:"48px",

color:"#00ffff",

align:"center"

}

);

}

function update(){

}
