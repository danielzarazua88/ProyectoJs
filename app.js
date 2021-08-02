const Swal = window.Sweetalert2;

const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 10;
class Juego {
  constructor() {
    Swal.fire("Hola!");
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 1000);
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.perdioElJuego = this.perdioElJuego.bind(this);
    this.ganoElJuego = this.ganoElJuego.bind(this);
    btnEmpezar.classList.add("hide");
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }
  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
    console.log(this.secuencia);
  }
  siguienteNivel() {
    var self = this;
    console.log(self);
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }
  transformarColorNumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }
  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
  }
  eliminarEventoClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
  }
  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorNumero(nombreColor);
    this.iluminarColor(nombreColor);
    console.log(
      "user: " +
        numeroColor +
        " subnivel: " +
        this.subnivel +
        " secuencia:" +
        this.secuencia[this.subnivel]
    );
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventoClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          //Win
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      //Perdio
      setTimeout(this.perdioElJuego, 500);
    }
  }
  ganoElJuego() {
    Swal.fire("Ganaste!").then(() => this.inicializar());
  }

  perdioElJuego() {
    var self = this;
    console.log(self);
    Swal.fire("Perdiste!").then(() => {
      self.eliminarEventoClick();
      self.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
