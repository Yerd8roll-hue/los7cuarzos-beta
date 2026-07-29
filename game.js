// LOS 7 CUARZOS - Beta 1.0
// Sistema inicial de juego


let cuarzosEncontrados = 0;


function iniciarJuego(){

    alert(
    "🌆 Neo-Terra Sector 09\n\n" +
    "Kael Vortex ha despertado.\n" +
    "La búsqueda de los 7 Cuarzos comienza..."
    );

}


function mostrarHistoria(){

    alert(
    "Año 2475...\n\n" +
    "La humanidad lucha por sobrevivir " +
    "mientras Nexarion busca reunir los 7 Cuarzos Primordiales."
    );

}



function encontrarCuarzo(){

    cuarzosEncontrados++;

    alert(
    "💎 RESONANCIA DETECTADA\n\n" +
    "Cuarzo Cronos encontrado.\n" +
    "Cuarzos: " + cuarzosEncontrados + "/7"
    );

}
