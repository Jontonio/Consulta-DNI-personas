import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje.models';
import { Persona } from '../models/persona.models';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url  : string = 'https://dniruc.apisperu.com/api/v1/dni/';
  token: string = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2VhbnRvbmlvcnN5c3RlbUBnbWFpbC5jb20ifQ.BCnFI0IWlU9IEjv5pXu74c8yysKmGP_NN1_c7kmu-QI'
  carga: boolean = false; 
  persona: Persona;
  verificado:boolean = false;
  alert:boolean = false
  mensaje = new Mensaje();
  historial = new Array<Persona>();

  constructor( private http:HttpClient ) {
    this.leerStorage();
  }

  validarDni(dni:string):boolean{

    if(!Number(dni)){

      this.mensaje.aviso = 'El dni digitado no es válido';
      this.mensaje.estado = true;
      setTimeout(() => this.mensaje.estado = false , 3000);

    } else if(dni.length!=8) {

      this.mensaje.aviso = 'El dni no contiene 8 carácteres';
      this.mensaje.estado = true;
      setTimeout(() => this.mensaje.estado = false , 3000);

    } else if(dni===null){

      this.mensaje.aviso = 'Complete el campo dni';
      this.mensaje.estado = true;
      setTimeout(() => this.mensaje.estado = false , 3000);

    } else {

      this.verificado = true;
      this.mensaje.aviso = '';
      this.mensaje.estado = false;
      this.mensaje.tipo = 'danger';

    }
    return this.verificado;
  }

  consultar( dni:string ){

    if (this.validarDni(dni)) {

      this.carga = true;
      this.http.get<Persona>(`${this.url}${dni}?${this.token}`).subscribe(
        (res)=>{
          if(res===null){
            this.mensaje.aviso = `No se encontro datos con el DNI ${dni}`
            this.mensaje.tipo = 'warning';
            this.mensaje.estado = true;
            this.carga = false
            setTimeout(() => this.mensaje.estado = false , 3000);
            return;
          }

          this.persona = res;
          this.carga = false
          this.historial.push(this.persona);
          this.guardarStorage();
        },
        (err)=>{ 
          this.mensaje.aviso = err
          this.mensaje.tipo = 'danger';
          this.carga = false
        }
      )

    }

  }

  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.historial));
  }

  leerStorage(){
    if(localStorage.getItem('data')!==null){
      this.historial = JSON.parse(localStorage.getItem('data'))
    }
  }

  eliminarStorage(){
    localStorage.removeItem('data');
    this.historial.length = 0;
    this.guardarStorage();
  }
  
  eliminarPersona(i:number){
    this.historial.splice(i,1);
    this.guardarStorage();
  }

}
