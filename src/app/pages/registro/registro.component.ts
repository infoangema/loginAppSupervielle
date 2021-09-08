import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  registerForm: FormGroup;
  hidePassword = true;



  constructor(private authService: AuthService,
      private fb: FormBuilder,

      ) { }

      ngOnInit() {
        this.registerForm = this.buildForm(); }

  buildForm(): FormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      name: ['', Validators.required]

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

    name: [
      {
        type: 'required',
        message: 'El nombre debe requerir al menos 6 letras'
      }
    ],
  };

  onSubmit(form : NgForm){
    
    if(form.invalid){
      return
    }
    
  //  this.auth.nuevoUsuario(this.usuario).subscribe(resp =>{
  //    console.log(resp)
  //    if (!this.recordarme){
  //     localStorage.setItem('email', this.usuario.mail);
  //   }
  //    this.router.navigateByUrl('/home');
  //  },
  //  (err)=>{
  //    console.log(err.error.error.message);
  //  });
  }




}
