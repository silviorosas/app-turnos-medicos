import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  nombreUsuario!: string;

  constructor(private tokenService: TokenService,private service:ServiceService) { }

  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
  }


  //funcion 
  descripcionConsulta: string = '';
  dniPaciente: string = '';
  buscarDescripcionPorDni(): void {
    this.service.buscarDescripcionPorDni(this.dniPaciente).subscribe(
      (descripcion: string) => {
        this.descripcionConsulta = descripcion;
      },
      (error) => {
        console.error('Error al buscar descripción:', error);
        this.descripcionConsulta = 'No se encontró ninguna descripción para el DNI ingresado.';
      }
    );
  }


//modal
  consultasPaciente: any[] = [];
  modalVisible: boolean = false;  
  abrirModal(): void { 
    this.buscarDescripcionPorDni()
    this.modalVisible = true;
  }

  cerrarModal(): void {     
    this.dniPaciente = '';
    this.modalVisible = false;
  }

}
