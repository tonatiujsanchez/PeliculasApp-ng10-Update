import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  public movies: Movie [] = [];
  public txtBuscar:string;

  constructor( private activatedRoute: ActivatedRoute,
               private _movies: MoviesService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.txtBuscar = params.txtBuscar;

        this._movies.buscarPeliculas( params.txtBuscar )
          .subscribe(
            (resp) =>{
              this.movies = resp;
            }
          )

      }
    );
  }

}
