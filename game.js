var canvas = document.getElementById("canvas");
var pintor = canvas.getContext("2d");

var pausado = false;

var x = 200;
var y = 240;

var lobos = [];

var ovejas = [];

var corral;

var jugador;

function Oveja() {
	this.x = Math.random()*800;
	this.y = Math.random()*600;
}

Oveja.prototype.pintar = function oveja_pintar() {
	pintor.fillStyle = "white";
	pintor.fillRect(this.x - 7.5, this.y - 7.5, 15, 15);
};

Oveja.prototype.actualizar = function oveja_actualizar(dt) {
	//La oveja huye del pastor y de los lobos
	var k_lobo = 500;
	var k_pastor = 1000;
	var k_oveja = -100

	var delta_x, delta_y;
	var dist_x, dist_y;
	var dist_al_cuadrado, dist, f;

	dist_x = (jugador.x - this.x);
	dist_y = (jugador.y - this.y);
	dist_al_cuadrado = (dist_x*dist_x + dist_y*dist_y);
	dist = Math.sqrt(dist_al_cuadrado);

	f = -k_pastor/dist_al_cuadrado;

	delta_x = f*dist_x/dist;
	delta_y = f*dist_y/dist;

	
	lobos.forEach(function (lobo) {
		dist_x = (lobo.x - this.x);
		dist_y = (lobo.y - this.y);
		dist_al_cuadrado = (dist_x*dist_x + dist_y*dist_y);
		dist = Math.sqrt(dist_al_cuadrado);

		f = -k_lobo/dist_al_cuadrado;

		delta_x = delta_x + f*dist_x/dist;
		delta_y = delta_y + f*dist_y/dist;
	});
	



	ovejas.forEach(function (oveja) {
                dist_x = (oveja.x - this.x);
                dist_y = (oveja.y - this.y);
                dist_al_cuadrado = (dist_x*dist_x + dist_y*dist_y);

                 dist = Math.sqrt(dist_al_cuadrado);

	If dist > 75 {
 		f=0;
	}

			Else {

                f = -k_oveja/dist_al_cuadrado;

	}
	  	delta_x = delta_x + f*dist_x/dist;
                delta_y = delta_y + f*dist_y/dist;
        });


	this.x = this.x + delta_x*dt;
	this.y = this.y + delta_y*dt;
};

function Lobo() {
	this.x = Math.random()*800;
	this.y = Math.random()*600;
}

Lobo.prototype.pintar = function lobo_pintar() {
	pintor.fillStyle = "grey";
	pintor.fillRect(this.x - 6, this.y - 6, 12, 12);
};

Lobo.prototype.actualizar = function lobo_actualizar(dt) {
	//El lobo huye del pastor y se acerca a las ovejas

	//TODO: El lobo debe fijarse en alguna de las ovejas e ir a por ella
	//FIX: Temporalmente a ponemos las constantes a 0
	//var k_pastor = 500;
	//var k_oveja = 1000;

	var k_pastor = 0;
	var k_oveja = 0;

	var delta_x, delta_y;
	var dist_x, dist_y;
	var dist_al_cuadrado, dist, f;

	dist_x = (jugador.x - this.x);
	dist_y = (jugador.y - this.y);
	dist_al_cuadrado = (dist_x*dist_x + dist_y*dist_y);
	dist = Math.sqrt(dist_al_cuadrado);

	f = -k_pastor/dist_al_cuadrado;

	delta_x = f*dist_x/dist;
	delta_y = f*dist_y/dist;

	
	ovejas.forEach(function (oveja) {
		dist_x = (oveja.x - this.x);
		dist_y = (oveja.y - this.y);
		dist_al_cuadrado = (dist_x*dist_x + dist_y*dist_y);
		dist = Math.sqrt(dist_al_cuadrado);

		f = k_oveja/dist_al_cuadrado;

		delta_x = delta_x + f*dist_x/dist;
		delta_y = delta_y + f*dist_y/dist;
	});
	

	this.x = this.x + delta_x*dt;
	this.y = this.y + delta_y*dt;
};

function Jugador() {
	this.x = Math.random()*800;
	this.y = Math.random()*600;
}

Jugador.prototype.pintar = function jugador_pintar() {
	pintor.fillStyle = "#f80";
	pintor.fillRect(this.x - 12.5, this.y - 12.5, 25, 25);
};

Jugador.prototype.entrada = function jugador_entrada(keyCode) {
	if(keyCode == 87) {
		this.y = this.y - 25;
	}
	if(keyCode == 65) {
		this.x = this.x - 25;
	}
	if(keyCode == 68) {
		this.x = this.x + 25;
	}
	if(keyCode == 83) {
		this.y = this.y + 25;
	}
};

function Corral() {
	this.x = Math.random()*700;
	this.y = Math.random()*500;
	this.orientacion = Math.floor(Math.random()*4);
}

Corral.prototype.pintar = function corral_pintar() {
	pintor.fillStyle = "SaddleBrown";
	pintor.fillRect(this.x, this.y, 100, 100);

	pintor.fillStyle = "LawnGreen";
	pintor.fillRect(this.x + 2.5, this.y + 2.5, 95, 95);

	switch(this.orientacion) {
		case 0: //Norte
			pintor.fillRect(this.x + 25, this.y, 50, 2.5);
			break;
		case 1: //Este
			pintor.fillRect(this.x + 97.5, this.y + 25, 2.5, 50);
			break;
		case 2: //Sur
			pintor.fillRect(this.x + 25, this.y + 97.5, 50, 2.5);
			break;
		case 3: //Oeste
			pintor.fillRect(this.x, this.y + 25, 2.5, 50);
			break;
	}
};

Corral.prototype.esta_dentro = function corral_esta_dentro(animal) {
	return(this.x < animal.x && animal.x < this.x + 100 && this.y < animal.y && animal.y < this.y + 100);
};

function inicializar() {
	var i;

	//Crear ovejas
	for(i = 0; i < 8; ++i) {
		ovejas[i] = new Oveja();
	}

	//Crear lobos
	for(i = 0; i < 2; ++i) {
		lobos[i] = new Lobo();
	}

	//Crear corral
	corral = new Corral();

	//Crear jugador
	jugador = new Jugador();
}

function jugar() {
	if(pausado) {
		pintor.fillStyle = "#fff";
		pintor.fillRect(0, 0, 100, 30);
		pintor.font = "20px Georgia";
		pintor.fillStyle = "pink";
		pintor.fillText("Pausado", 20, 20);
	} else {
		actualizar();
		pintar();
	}
}

function actualizar() {
	var dt = 1000/25;

	ovejas.forEach(function (oveja) {
		oveja.actualizar(dt);
	});

	lobos.forEach(function (lobo) {
		lobo.actualizar(dt);
	});
}

function pintar() {
	pintor.fillStyle = "pink";
	pintor.fillRect(0, 0, 800, 600);

	corral.pintar();

	ovejas.forEach(function (oveja) {
		oveja.pintar();
	});

	lobos.forEach(function (lobo) {
		lobo.pintar();
	});

	jugador.pintar();
}

window.addEventListener("keydown", function(event) {
	if (pausado) {
		if (event.keyCode == 80) {
			pausado = false;
		}
	}
	else {
		jugador.entrada(event.keyCode);
		if(event.keyCode == 80) {
			pausado = true;
		}
	}
});

inicializar();

window.setInterval(jugar, 25);
