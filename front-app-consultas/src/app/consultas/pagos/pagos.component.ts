import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor( private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loading: boolean = false;

  pagar(){    
      // Muestra el indicador de carga
      this.loading = true;
    setTimeout(() => {
      this.router.navigate(['video']);
      this.toastr.success("Pago exitoso!!")
       // Oculta el indicador de carga después de la navegación
       this.loading = false;
    }, 5000);
    
  }

}
