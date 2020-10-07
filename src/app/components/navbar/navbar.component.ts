import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  buscarPelicula( txtBuscar:string ){
    if( txtBuscar.trim() === "" ){
       console.log('Debes ingresar algo en el input');
      return; 
    }
    this.router.navigate(['/search', txtBuscar]);
  }
  

}
