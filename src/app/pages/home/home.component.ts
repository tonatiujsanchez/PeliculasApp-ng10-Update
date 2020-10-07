import { Component, OnInit, HostListener } from '@angular/core';

import { Movie } from '../../interfaces/cartelera-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public movies: Movie [] = [];
  public moviesSlideshow: Movie [] = [];
  
  @HostListener('window:scroll', ['$event'])
  onScroll(){
  
    const scrollPosition    = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const scrollPositionMax = ( document.documentElement.scrollHeight|| document.body.scrollHeight ); 
  
    if( scrollPosition > scrollPositionMax ){
      if( this._movies.estaCargado ){
        return;
      }else{
        this.getPeliculas();
      }
    } 
  
  }

  constructor( private _movies: MoviesService ) { }

  ngOnInit(): void {
    this._movies.resetPage();
    this.getPeliculas();
  }

  getPeliculas(){
    this._movies.getCartelera().subscribe(
      resp =>{
        this.movies.push( ...resp );
        
        if( !(this.moviesSlideshow.length > 0) ){
          this.moviesSlideshow = resp.slice(0, 10);
        }
        
      }
    );
  }

}
