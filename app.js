const $btnNuevo = $('#btn-nuevo');
const $btnPedir = $('#btn-pedir');
const $btnDetener = $('#btn-detener');

const num = [2,3,4,5,6,7,8,9,10];
const sim = ['A','Q','J','K'];
const palos = ['C','D','S','H'];

let baj = [];
let carta;
let valor = 0;
let ptj = 0;
let ptc = 0;

let crearBaraja = () =>{

    for(const n of num){
        for(const p of palos){
            baj.push(n+p);
        }
    }
    for(const l of sim){
        for(const p of palos){
            baj.push(l+p);
        }
    }

    console.log(baj);
    baj = _.shuffle(baj);
    console.log(baj);
    
};

let valorCarta = (carta) => {
    valor = carta.slice(0,-1);
    return sim.includes(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
    
}

let mostraMensaje = (ganoJugador) => {
     setTimeout(() => {
        $('#mensaje').removeAttr('hidden');
        if(ganoJugador === true){
            
    
            $('#mensaje').text('El jugador gano');
            $('#mensaje').addClass('bg-success');
            $('#mensaje').removeClass('bg-danger');
            
        }else{
            $('#mensaje').text('La computadora gano');
            
            $('#mensaje').removeClass('bg-success');
            $('#mensaje').addClass('bg-danger');
    
        }
        
    }, 400);
}

let nuevoJuego = () => {
    $('#cj').html('');
    ptj = 0;
    $('#pj').text(ptj);
    $('#ccpu').html('');
    ptc = 0;
    $('#pc').text(ptc);

    $btnPedir.removeAttr('disabled');
    $btnDetener.removeAttr('disabled');

    $('#mensaje').attr('hidden','true');

}

let pedirBaraja = () => {
    carta = baj.shift();
    $('#cj').html($('#cj').html() + `<img src="./cartas/${carta}.png" alt="">`)
    ptj += valorCarta(carta);
    $('#pj').text(ptj);
    if(ptj > 21){
        $btnPedir.attr('disabled','true');
        $btnDetener.attr('disabled','true')
        detener();
    }
}

let detener = () => {
    let ganoJugador = true;
    $btnPedir.attr('disabled','true');
    $btnDetener.attr('disabled','true')
    const interval = setInterval(() => {
        carta = baj.shift();
        $('#ccpu').html($('#ccpu').html() + `<img src="./cartas/${carta}.png" alt="">`);
        ptc += valorCarta(carta);
        $('#pc').text(ptc);

        if(ptj > 21 || (ptc >= ptj && ptc <= 21)){
            clearInterval(interval);
            ganoJugador = false;
            mostraMensaje(ganoJugador);
        }
        if(ptc > 21){
            clearInterval(interval);
            mostraMensaje(ganoJugador);
        }

    },250);
}

crearBaraja();

$btnNuevo.click(function () {
    nuevoJuego();
});

$btnPedir.click(function () {
    pedirBaraja();
});

$btnDetener.click(function () {
    detener();
});
