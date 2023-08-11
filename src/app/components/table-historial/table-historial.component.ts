import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/models/persona.models';
import { ConsultaService } from 'src/app/service/consulta.service';

@Component({
  selector: 'app-table-historial',
  templateUrl: './table-historial.component.html',
  styleUrls: ['./table-historial.component.css']
})
export class TableHistorialComponent implements OnInit {

  @Input() listConsulta:Persona[] = [];

  constructor(  public cservice:ConsultaService ) { }

  ngOnInit(): void {
  }


  eliminarItem(indice:number){
    this.cservice.eliminarPersona(indice);
  }

}
