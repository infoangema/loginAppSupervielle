import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

//import { LoadingService } from 'src/app/core/loading/loading.service';
import { AuthService } from '../../services/auth.service';
import { ErrorDialogComponent } from 'src/app/shared/components/dialogs/error-dialog/error-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  hidePassword = true;
  loginForm: FormGroup;




  constructor(
    private fb: FormBuilder,
   // private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,




    ) { 

  }

  ngOnInit() {
    this.loginForm = this.buildForm();
    if(localStorage.getItem('email')){
this.usuario.mail = localStorage.getItem('email');
this.recordarme = true;
    }
  }

  buildForm(): FormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      remember: [false],
    });
    return form;
  }

  onTogglePasswordVisibilityClick(): void {
    this.hidePassword = !this.hidePassword;
  }

  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'Ingrese un email correcto'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña debe de ser más de 6 letras'
      }
    ],
  };

 
  onLoginClick(): void {
    console.log(this.authService.login)

    this.loginForm.markAsUntouched();

    if (!this.loginForm.valid) {
      const errors: string[] = [];

      Object.keys(this.loginForm.controls).forEach((k) => {
        const control = this.loginForm.controls[k];
        const errorMessages = this.validationMessages[k] as {
          type: string;
          message: string;
        }[];

        if (!control.errors) {
          return;
        }

        Object.keys(control.errors).forEach((e) => {
          const errorMessage = errorMessages.find((em) => em.type === e);

          errors.push(errorMessage.message);
        });
      });
    }

 //this.loadingService.tryToStartLoading();
    this.authService
     
    .login(
        this.loginForm.value.email,
        this.loginForm.value.password,
      ).subscribe((loginResponse : any) => {
  //this.loadingService.tryToStopLoading() 
        console.log(loginResponse);
  if(loginResponse.header){
          console.log(loginResponse)
            this.router.navigate(['/home']);
            this.dialog.closeAll();
          }
        },
        error =>{
          console.log('error')
          this.dialog.open(ErrorDialogComponent, {
            width: '350px',
            data: 'Los datos ingresados no son válidos',
            restoreFocus: false
          });

        } 
      );
  }



}
