import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../interfaces/movie.response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  
  public pelicula:MovieResponse;
  public cast: Cast[];
  constructor( private activatedRoute: ActivatedRoute,
               private _movie: MoviesService,
               private Location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(
    //   (params)=>{
    //     console.log(params.id);
    //   }
    // );
    const idMovie = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this._movie.getDetallesPelicula( idMovie ),
      this._movie.getCreditosPelicula( idMovie )
    ]).subscribe(
      ([ pelicula, cast ]) =>{

        if( !pelicula ){ 
          this.router.navigateByUrl('/home');
        return;
        }
        this.pelicula = pelicula;

        this.cast = cast;
        // this.cast = resp.filter( actor => actor.profile_path != null );  //Filtrar solo los que tengan fotografia
      }
    )

    // this._movie.getDetallesPelicula( idMovie ).subscribe(
    //   (movie)=>{
    //     if( !movie ){ 
    //       this.router.navigateByUrl('/home');
    //       return;
    //     }
    //     this.pelicula = movie;
    //   }
    // );

    // this._movie.getCreditosPelicula( idMovie ).subscribe(
    //   ( resp ) =>{
    //     this.cast = resp;
    //     // this.cast = resp.filter( actor => actor.profile_path != null );  //Filtrar solo los que tengan fotografia
    //   }
    // );

  }

  regresar(){
    this.Location.back();
  }

}
