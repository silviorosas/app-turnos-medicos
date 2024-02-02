import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { ServiceService } from '../service.service';
import { Medico } from '../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-consultas',
  templateUrl: './crear-consultas.component.html',
  styleUrls: ['./crear-consultas.component.css']
})
export class CrearConsultasComponent implements OnInit {
  nuevoUsuario!: NuevoUsuario;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  errMsj!: string;
  consultaForm!: FormGroup;
  medicos:Medico[]=[]


  constructor(private formBuilder:FormBuilder, private service:ServiceService,
    private router: Router, private toastr: ToastrService) {
   
      this.consultaForm = this.formBuilder.group({
        descripcion: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9 ]+$')]],              
        dniPaciente: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(8), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
        idMedico: ['', Validators.required],
        fechaAgendarTurno: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)]]
        
      });
   }

  ngOnInit(): void {
    this.getMedicos()
  }

  getMedicos(){
    this.service.getMedicos()
    .subscribe((data:any)=>{
      this.medicos=data;
      console.log("Get médicos desde back:",data)
  })  
  }

/* 
  crearConsultaDni(){
    if (this.consultaForm.valid) {
      const { descripcion, dniPaciente, idMedico } = this.consultaForm.value;
      
      // Llamar al método buscarIdPorDNI para obtener el ID del paciente
      this.service.obtenerIdPacientePorDni(dniPaciente).subscribe(
        (idPaciente: number) => {
          this.service.crearConsulta(descripcion, idPaciente, idMedico).subscribe(
            () => {              
              this.consultaForm.reset();
              this.toastr.success("Turno obtenido exitosamente!")
              this.router.navigate(['dashboard']);
            },
            (error) => {
              console.error('Error al crear consulta:', error);
            }
          );
        },
        (error) => {
          alert('Error al buscar ID por DNI:');
        }
      );
    }
  } */


  showSpinner: boolean = false;
    

  crearConsultaDniNew(){
    console.log("desde crearConsulta()")
    if (this.consultaForm.valid) {
      const { descripcion, dniPaciente, idMedico,fechaAgendarTurno } = this.consultaForm.value;
      this.showSpinner = true;
      // Llamar al método buscarIdPorDNI para obtener el ID del paciente
      this.service.obtenerIdPacientePorDni2(dniPaciente).subscribe(
        (idPaciente: number) => {
          this.service.crearConsultaNew(descripcion, idPaciente, idMedico,fechaAgendarTurno).subscribe(
            () => {             
              this.consultaForm.reset();
              this.router.navigate(['dashboard']);
              this.showSpinner = false;
            },
            (error) => {
              console.log('Error al crear consulta:', error);
              this.showSpinner = false;                
            }
          );
        },
        (error) => {
          console.error('Error al buscar ID por DNI:', error);
          this.showSpinner = false;
          
        }
      );
    }
  }




}
