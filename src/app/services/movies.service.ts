import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

import { catchError, map, tap } from 'rxjs/operators'
import { MovieResponse } from '../interfaces/movie.response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://api.themoviedb.org/3';
  private carteleraPAge = 1;
  public estaCargado = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '369190b3710d58cff5bfa8c5ead757fd',
      language: 'es-ES',
      page: this.carteleraPAge.toString()
    }
  }

  resetPage(){
    this.carteleraPAge = 1;
  }


  getCartelera(): Observable<Movie[]> {

    if( this.estaCargado ){
      //esta cargardo
      return of([]);
    }
    
    this.estaCargado = true;
    
    return this.http.get<CarteleraResponse>(`${this.url}/movie/now_playing`, {
      params: this.params
    })
      .pipe(
        map( (resp) => resp.results ),
        tap(
          () => {
            this.carteleraPAge += 1;
            this.estaCargado = false;
          }
        )
      )
  }
  
  // https://api.themoviedb.org/3/search/movie?api_key=369190b3710d58cff5bfa8c5ead757fd&language=es-ES&query=nemo&page=1&include_adult=false
  buscarPeliculas( txtBuscar ): Observable<Movie[]>{
    const params = { ...this.params,
                     page: '1',
                     query: txtBuscar 
                    };

    return this.http.get<CarteleraResponse>(`${this.url}/search/movie`, {
      params: params
    })
    .pipe(
      map( (resp) => resp.results )
    )
  }
  
  // https://api.themoviedb.org/3/movie/337401?api_key=369190b3710d58cff5bfa8c5ead757fd&language=es-ES
  getDetallesPelicula( idMovie ){
    return this.http.get<MovieResponse>( `${ this.url }/movie/${ idMovie }`,{
      params: this.params
    })
    .pipe(
      catchError( err => of(null))
    )
  }


  // https://api.themoviedb.org/3/movie/726739/credits?api_key=369190b3710d58cff5bfa8c5ead757fd
  getCreditosPelicula( idMovie ):Observable<Cast[]> {
    return this. http.get<CreditsResponse>( `${this.url}/movie/${ idMovie }/credits`, {
      params: this.params
    })
    .pipe(
      map( resp => resp.cast ),
      catchError( err => of([]))
    )
  }
  

}
