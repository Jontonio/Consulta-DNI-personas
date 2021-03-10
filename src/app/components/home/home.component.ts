import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dni       :string = '';
  alert     :boolean = false;
  
  constructor( public cservice:ConsultaService) { }

  ngOnInit(): void {
  }

  consultar(){
    this.cservice.consultar(this.dni);
    this.dni = '';
  }

  eliminarItem(indice:number){
    this.cservice.eliminarPersona(indice);
  }

  eliminarAll(){
    this.cservice.eliminarStorage()
  }

  cancelar(){
    this.dni = '';
  }


}
