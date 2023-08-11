import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/service/consulta.service';

@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.css']
})
export class FormConsultaComponent implements OnInit {

  dni       :string = '';
  alert     :boolean = false;

  constructor( public cservice:ConsultaService ) { }
  consultar(){
    this.cservice.consultar(this.dni);
    this.dni = '';
  }

  ngOnInit(): void {
  }

}
