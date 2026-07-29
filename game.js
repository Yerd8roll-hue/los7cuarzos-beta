// =========================================
// LOS 7 CUARZOS
// Beta 2.0
// Motor 2D Inicial
// =========================================


// ---------- PANEL ----------

function iniciarJuego(){

document.getElementById("mensaje").innerHTML =

`
<h2>🌆 NEO-TERRA</h2>

Usa las teclas W A S D para moverte.

Tu misión es encontrar el primer Cuarzo.
`;

}


function mostrarHistoria(){

document.getElementById("mensaje").innerHTML =

`
<h2>🌌 HISTORIA</h2>

Año 2475...

Los 7 Cuarzos fueron separados por
todo Neo-Terra.

Solo Kael puede recuperarlos.
`;

}


function mostrarCuarzos(){

document.getElementById("mensaje").innerHTML =

`
💎

Cronos

Furia

Mental

Génesis

Solar

Abismo

Supremo
`;

}



// ---------- CANVAS ----------

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");



// ---------- JUGADOR ----------

const jugador={

x:80,

y:80,

ancho:40,

alto:40,

velocidad:5

};



// ---------- CUARZO ----------

const cuarzo={

x:650,

y:350,

ancho:25,

alto:25,

encontrado:false

};



// ---------- TECLAS ----------

const teclas={};

document.addEventListener("keydown",(e)=>{

teclas[e.key.toLowerCase()]=true;

});

document.addEventListener("keyup",(e)=>{

teclas[e.key.toLowerCase()]=false;

});



// ---------- MOVIMIENTO ----------

function moverJugador(){

if(teclas["w"]) jugador.y-=jugador.velocidad;

if(teclas["s"]) jugador.y+=jugador.velocidad;

if(teclas["a"]) jugador.x-=jugador.velocidad;

if(teclas["d"]) jugador.x+=jugador.velocidad;

}



// ---------- COLISION ----------

function comprobarCuarzo(){

if(cuarzo.encontrado) return;

if(

jugador.x < cuarzo.x + cuarzo.ancho &&
jugador.x + jugador.ancho > cuarzo.x &&
jugador.y < cuarzo.y + cuarzo.alto &&
jugador.y + jugador.alto > cuarzo.y

){

cuarzo.encontrado=true;

document.getElementById("mensaje").innerHTML=

`
<h2>💎 MISIÓN COMPLETADA</h2>

¡Has encontrado el

CUARZO CRONOS!

`;

}

}



// ---------- DIBUJAR ----------

function dibujar(){

ctx.clearRect(0,0,canvas.width,canvas.height);


// fondo

ctx.fillStyle="#111122";

ctx.fillRect(0,0,canvas.width,canvas.height);


// jugador

ctx.fillStyle="cyan";

ctx.fillRect(

jugador.x,

jugador.y,

jugador.ancho,

jugador.alto

);


// cuarzo

if(!cuarzo.encontrado){

ctx.fillStyle="yellow";

ctx.fillRect(

cuarzo.x,

cuarzo.y,

cuarzo.ancho,

cuarzo.alto

);

}

}



// ---------- GAME LOOP ----------

function actualizar(){

moverJugador();

comprobarCuarzo();

dibujar();

requestAnimationFrame(actualizar);

}


actualizar();
