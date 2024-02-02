import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-consultas',
  templateUrl: './login-consultas.component.html',
  styleUrls: ['./login-consultas.component.css']
})
export class LoginConsultasComponent implements OnInit {

  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {    
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.toastr.success("Bienvenido/a ",this.loginUsuario.nombreUsuario)
        this.router.navigate(['dashboard']);
      },
      err => {         
        this.toastr.error('Nombre de Usuario o Contraseña incorrecta.','Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );

  }



}
