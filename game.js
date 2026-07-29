// LOS 7 CUARZOS - Beta 1.1

let cuarzosEncontrados = 0;


function iniciarJuego(){

document.getElementById("mensaje").innerHTML =

`
<h2>🌆 NEO-TERRA SECTOR 09</h2>

🧑‍🚀 Kael Vortex ONLINE<br><br>

🤖 Nox K-01 activado<br><br>

🎯 Misión actual:<br>

Encontrar el primer fragmento del
💎 Cuarzo Cronos
`;

}



function mostrarHistoria(){

document.getElementById("mensaje").innerHTML =

`
<h2>🌌 HISTORIA</h2>

Año 2475...<br><br>

La humanidad vive entre ciudades
futuristas y máquinas inteligentes.<br><br>

Los 7 Cuarzos Primordiales contienen
un poder capaz de cambiar el destino
de la humanidad.
`;

}



function mostrarCuarzos(){

document.getElementById("mensaje").innerHTML =

`
<h2>💎 LOS 7 CUARZOS</h2>

🔵 Cronos<br>
🔴 Furia<br>
🟣 Mental<br>
🟢 Génesis<br>
🟠 Solar<br>
⚫ Abismo<br>
⚪ Supremo
`;

}
