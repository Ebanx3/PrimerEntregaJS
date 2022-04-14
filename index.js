// Primera entrega del proyecto final -  curso de JavaScript / CoderHouse
//Esteban dos Santos Mello

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

class Personaje{
    constructor(nombre){
        this.nombre = nombre;
        this.lvl = 1;
        this.exp = 0;
        this.hp = 50;
        this.actualHp = 50;
        this.dmg = 10;
        this.dmgActual= this.dmg;
        this.def = 1;
        this.vivo = true;
        this.oro = 0;
        this.tieneArma = false;
        this.inventario = [
            {
                nombre: 'pocionMenor',
                efecto: 20,
                precio: 10,
                cantidad:5
            },
            {
                nombre: 'pocion',
                efecto: 35,
                precio: 15,
                cantidad:0
            },{
                nombre: 'pocionMayor',
                efecto: 60,
                precio: 22,
                cantidad: 0
            }
        ]
    }
    
    Atacar(){
        const num = random(1,3)/2;
        return this.dmgActual * num;
    }

    GetDmgActual(){
        return this.dmgActual;
    }

    Cubrirse(){
        this.def = 2;
    }

    RecibirDanio(cant){
        let valor = Math.trunc(cant/this.def);
        this.actualHp -= valor;
        if(this.actualHp <= 0){
            this.vivo = false; 
        }
        if(this.def==2){
            this.def = 1;
        }
        return Math.trunc(valor);
    }

    Curar(cant){
        this.actualHp += cant;
        if(this.actualHp > this.hp){
            this.actualHp = this.hp;
        }
    }

    SubirNivel(){
        this.lvl++;
        this.hp *= 1.1;
        this.dmg *= 1.1;
        this.dmgActual *= 1.1; 
    }

    SumarExperiencia(cant){
        this.exp += cant;
    }

    ResolverNivel(){
        const expNiveles = [0, 20, 35, 65, 120, 230, 440, 800, 1520];
        let i = 0;
        let nivel = this.lvl;
        while(this.exp >= expNiveles[i]){
            
        }
    }

    NormalizarDef(){
        this.def = 1;
    }

    AgregarItemInventario(item,cant){
        /*
            Busca si existe un item con el mismo nombre ya en inventario, si existe incrementa la cantidad, sino lo agrega
        */ 
        const ind = this.inventario.findIndex(elem => elem.nombre == item.nombre);
        if (ind == -1){
            item.cantidad = cant;
            this.inventario.push(item);
        }
        else{
            this.inventario[ind].cantidad += cant;
        }
        //Si el objeto que agrega al inventario es un arma incrementa el daño
        if (item.esArma){
            if(this.tieneArma){ //En caso de tener un arma e intentar equipar otra se deshace de la primera
                const indice = this.inventario.findIndex(element => element.esArma);
                this.inventario.splice(indice, 1);
            }
            this.dmgActual = this.dmg + item.efecto;
            this.tieneArma = true;
        }
        console.log(this.inventario);
    }

    QuitarItemInventario(nombre,cant){
        /*
            Recibe el nombre del objeto para borrar y la cantidad, busca con findIndex si existe algun elemento con ese nombre
            y en caso de encontrarse ese indice comprueba la cantidad, en caso de haber más de lo que se desea eliminar se resta la cantidad
            en caso contrario quita el objeto del arreglo. 
            No hará nada si no se encuentra un objeto con ese nombre
        */
        const indice = this.inventario.findIndex(element => element.nombre == nombre);
        if (indice >= 0){
            if (this.inventario[indice].cantidad > cant){
                this.inventario[indice].cantidad -= cant;
            }
            else if (this.inventario[indice].cantidad == 1){
                if(this.inventario[indice].esArma){
                    this.dmgActual = this.dmg;
                    this.tieneArma = false;
                }
                this.inventario.splice(indice, 1);
            }
            console.log(this.inventario);
            
        }    
    }

    
}

class Enemigo{
    constructor(nombre,lvl,hp,dmg){
        this.nombre = nombre;
        this.lvl = lvl;
        this.hp = hp;
        this.dmg = dmg;
        this.def = 1;   
        this.vivo = true;  
    }
     
    Atacar(){
        const num = random(1,4)/3;
        return this.dmg * num;
    }

    Cubrirse(){
        this.def = 2;
    }

    RecibirDanio(cant){
        let valor = Math.trunc(cant/this.def)
        this.hp -= valor;
        if(this.hp <= 0){
            this.vivo = false; 
        }
        if(this.def==2){
            this.def = 1;
        }
        return Math.trunc(valor);
    }

    NormalizarDef(){
        this.def=1;
    }
}

const tienda = [
    {
        nombre: 'pocionMenor',
        esArma:false,
        efecto: 20,
        precio: 10,
        cantidad:1
    },
    {
        nombre: 'pocion',
        esArma:false,
        efecto: 35,
        precio: 15,
        cantidad:1
    },{
        nombre: 'pocionMayor',
        esArma:false,
        efecto: 60,
        precio: 22,
        cantidad:1
    },
    {
        nombre: 'espadaMadera',
        esArma:true,
        efecto: 5,
        precio: 18,
        cantidad:1
    },
    {
        nombre: 'espadaAcero',
        esArma:true,
        efecto: 12,
        precio: 30,
        cantidad:1
    },
    {
        nombre: 'Excalibur',
        esArma:true,
        efecto: 50,
        precio: 90,
        cantidad:1
    }
]


function GenerarEnemigo(personaje){
    if(personaje.lvl <= 3){
        let enemigo = new Enemigo('Goblin',personaje.lvl,personaje.hp - 10,personaje.dmg);
        return enemigo;
    }else if(personaje.lvl <= 6){
        let enemigo = new Enemigo('Orco',personaje.lvl,personaje.hp + 10,personaje.dmg - 2);
        return enemigo;
    }else{
        let enemigo = new Enemigo('Dragon',20, 100, 20);
        return enemigo;
    }
}

function AccionPersonaje(string, origen, destino){
    if(string == 'atacar'){
        alert(`${origen.nombre} ataca al ${destino.nombre} enemigo`);
        let cant = destino.RecibirDanio(origen.Atacar());
        alert(`${destino.nombre} recibe ${cant} de daño`);
    }
    else if(string == 'cubrir'){
        origen.Cubrirse();
        alert(`${origen.nombre} se cubre`);
    }
    else if(string == 'curar'){
        origen.Curar(30);
        alert(`${origen.nombre} se toma una poción`)
    }
}

function AccionEnemiga(origen, destino){
    let num = random(1,3);
    if(num <= 2){
        alert(`El ${origen.nombre} enemigo ataca a ${destino.nombre}`);
        let cant = destino.RecibirDanio(origen.Atacar());
        alert(`El ${origen.nombre} hizo ${cant} de daño`);
    }else{
        origen.Cubrirse();
        alert(` El ${origen.nombre} se cubre`);
    }
}

alert(`Bienvenido\nVamos a jugar un juego de batallas por turnos`);
const nombrePersonaje = prompt('Ponle un nombre a tu personaje');
const personaje = new Personaje(nombrePersonaje);
personaje.AgregarItemInventario(tienda[5],1);
alert(`Tienes la excalibur en tus manos!\nAtaque de Eban :${personaje.GetDmgActual()}`);
console.log('Equipaste la excalibur  y no se rompe')
personaje.QuitarItemInventario('Excalibur',1);
console.log('Si ves esto, el quitar la excalibur no rompe')
alert(`Ya no la tienes ${personaje.GetDmgActual()}`)
alert('Estás en una planicie y ves un camino y sin tener nada más que hacer empiezas a andar...\nHasta que de pronto...');

while(personaje.vivo){
    let enemigo = GenerarEnemigo(personaje);
    alert(`Aparece un ${enemigo.nombre} enemigo, de nivel ${enemigo.lvl}!`);
    while(enemigo.vivo && personaje.vivo){
        let accion = prompt('Que quieres hacer?\n(atacar, cubrir, curar)');
        while(accion.toLowerCase() != 'atacar' && accion.toLowerCase() != 'cubrir' && accion.toLowerCase() != 'curar'){
            alert('Debes seleccionar entre atacar, cubir o curar');
            accion = prompt('Que quieres hacer?\n(atacar, cubrir, curar)');
        }
        AccionPersonaje(accion, personaje, enemigo);
        if(!enemigo.vivo){
            break;
        }
        AccionEnemiga(enemigo, personaje);
        alert(`NOMBRE: ${personaje.nombre}\nLVL: ${personaje.lvl}\nHP: ${personaje.actualHp}`);
    }
    if(!personaje.vivo){
        alert(`${personaje.nombre} ha muerto! Has perdido! :(`)
        break;
    }
    personaje.SubirNivel();
    alert(`Mataste al ${enemigo.nombre} enemigo, y subiste de nivel!\nAhora eres nivel ${personaje.lvl}!`);
    let queHacer = prompt('Quieres seguir jugando? (si o no)');
    while(queHacer.toLowerCase() != 'si' && queHacer.toLowerCase() != 'no'){
        queHacer = prompt('Quieres seguir jugando? (si o no)');
    }
    if(queHacer == 'no')
    {
        break;
    }
    alert('Pronto sigues caminando hasta que...')
}
