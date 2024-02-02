import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private datePipe: DatePipe) { }


getMedicos(){
  return this.http.get<any>(environment.productoURL2+"medicos")
}

getConsultas(){
  return this.http.get<any>(environment.productoURL2+"consultas").pipe(
    
  )
}

buscarDescripcionPorDni(dni: string): Observable<string> {
  return this.http.get<string>(`${environment.productoURL2}pacientes/buscar-descripcion?dni=${dni}`);
}

obtenerIdPacientePorDni(dni: string): Observable<number> {
  return this.http.get<number>(`${environment.productoURL2}pacientes/obtener-id/${dni}`);
}


 // Método para crear una nueva consulta ES EL FUNCIONA TOTALMENTE
 crearConsultaNew(descripcion: string, idPaciente: number, idMedico: number,fechaAgendarTurno: string): Observable<any> {  
  const fechaAEnviar = this.datePipe.transform(fechaAgendarTurno, 'dd-MM-yyyy HH:mm');
  console.log('Fecha enviada al backend:', fechaAEnviar);
   const body = {
     descripcion: descripcion,
     paciente: { id: idPaciente },
     medico: { id: idMedico },
     fechaAgendarTurno: fechaAEnviar
   };
    console.log('Body enviado al backend:', body);
   return this.http.post(`${environment.productoURL2}consultas`, body).pipe(
     catchError((error: HttpErrorResponse) => {
       let errorMessage = 'Error desconocido en la solicitud';

       if (error.error instanceof ErrorEvent) {
         errorMessage = `Error: ${error.error}`;
       } else {
         errorMessage = `${error.error}`;//trae mje de error del back
       }

       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: errorMessage,
         width: '300px',         
       });

       return throwError(errorMessage);
     }),
     // Manejar el éxito
     tap(() => {
       Swal.fire({
         icon: 'success',
         title: 'Éxito',
         text: 'Consulta creada exitosamente',
         width: '300px', 
       });
     })
   );
 }


 //METODO FUNCIONAL CON SWEET ALERT
 obtenerIdPacientePorDni2(dni: string): Observable<number> {
  return this.http.get<number>(`${environment.productoURL2}pacientes/obtener-id/${dni}`).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error desconocido en la solicitud';
  
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error}`;
      } else {
        errorMessage = `${error.error}`;
      }
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        width: '300px', 
        background: '#f2f2f2'
      });
  
      return throwError(errorMessage);
    }),
    
  );
}
   



}