import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje.models';
import { Persona } from '../models/persona.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

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

      this.mensaje.aviso = 'Complete el campo DNI';
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

    if(!dni) return;

    if (this.validarDni(dni)) {

      this.carga = true;
      this.http.get<Persona>(`${environment.URL_API}${dni}?${environment.TOKEN}`).subscribe(
        (res)=>{
          this.carga = false
          if(res.message && !res.success){
            this.mensaje.aviso = res.message;
            this.mensaje.tipo = 'warning';
            this.mensaje.estado = true;
            setTimeout(() => this.mensaje.estado = false , 3500);
            return;
          }
          this.persona = res;
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
    this.historial = [];
    this.guardarStorage();
  }

  eliminarPersona(i:number){
    this.historial.splice(i,1);
    this.guardarStorage();
  }

}
