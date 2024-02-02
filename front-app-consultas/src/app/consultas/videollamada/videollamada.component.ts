import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videollamada',
  templateUrl: './videollamada.component.html',
  styleUrls: ['./videollamada.component.css']
})
export class VideollamadaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.iniciarContador();
  }

  iniciarContador(): void {
    const contadorElement = document.getElementById('contador');
    const fondoElement = document.getElementById('fondo');
    const miVideo = document.getElementById('miVideo');

    if (contadorElement && fondoElement && miVideo) {
      let segundos = 0;
      const limiteSegundos = 10; 

      const intervalo = setInterval(() => {
        segundos++;
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const secs = segundos % 60;

        const tiempo = `${('0' + horas).slice(-2)}:${('0' + minutos).slice(-2)}:${('0' + secs).slice(-2)}`;
        contadorElement.textContent = tiempo;

        if (segundos >= limiteSegundos) {
          fondoElement.style.display = 'none'; 
          miVideo.style.display = 'block'; 
          (miVideo as HTMLVideoElement).play(); 

          miVideo.addEventListener('ended', () => {
            clearInterval(intervalo); // Detener el contador cuando se termine el video
            console.log('El video ha terminado');
          });
        }
      }, 1000); 
    }
  }
}



