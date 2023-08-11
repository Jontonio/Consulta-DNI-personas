import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor( public cservice:ConsultaService ) { }


  eliminarAll(){
    this.cservice.eliminarStorage()
  }

}
