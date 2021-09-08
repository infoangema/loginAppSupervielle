import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequesterService } from './requester.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userToken:string;
  hoy: Date;



  constructor(private http: HttpClient,
            private requestServices: RequesterService) { 
    this.leerToken();
  }

  logOut(){
    localStorage.removeItem('token');

  }
//   login(emailIn: string, passwordIn: string) {
//     let headers = new HttpHeaders().set('Content-Type', 'application/json');
//     const body = {
//       mail: emailIn,
//       password: passwordIn,
//     }
//     return this.requestServices.post(`https://hours-backend-pruebas.herokuapp.com/login`, body )
//  }

 login(emailIn: string, passwordIn: string){
  let headers = new HttpHeaders().set('observe', 'response');
  const body = {
        mail: emailIn,
       password: passwordIn,
      }

  return this.http.post(`https://hours-backend-pruebas.herokuapp.com/login`, body, {observe: 'response' as 'body'})

 }

//   login2(usuario: UsuarioModel){
//     const authData = {

//       email: usuario.mail,
//       password : usuario.password,
//       returnSecureToken: true,};
//   return this.http.post(
//     `${ this.url }/accounts:signInWithPassword?key= ${ this.apikey }`,
//     authData
//   ).pipe(
//     map( resp =>{
//       this.guardarToken (resp['idToken'])
//       return resp;
//     })
//   );
// }


  // nuevoUsuario(usuario: UsuarioModel){

  //   const authData = {

  //       email: usuario.mail,
  //       password : usuario.password,
  //       returnSecureToken: true,

  //   };
  //   return this.http.post(
  //     `${ this.url }/accounts:signUp?key= ${ this.apikey }`,
  //     authData
  //   ).pipe(
  //     map( resp =>{
  //       this.guardarToken (resp['idToken'])
  //       return resp;
  //     })
  //   );
  // }

  private guardarToken (idToken){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    this.hoy = new Date();
    this.hoy.setSeconds(3600);

    localStorage.setItem('expirta', this.hoy.getTime().toString());



  }

  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');

    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length<2){
      return false
    }

    const expira = Number(localStorage.getItem('expirta'));
    const expiraDate = new Date ();
    expiraDate.setTime(expira);

    if (expiraDate > new Date ()){
      return true
    }else {
      return false;
    }

    return this.userToken.length > 2;

  }

}
