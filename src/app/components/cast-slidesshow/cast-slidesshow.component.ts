import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from '../../interfaces/credits-response';
import Swiper from 'swiper';



@Component({
  selector: 'app-cast-slidesshow',
  templateUrl: './cast-slidesshow.component.html',
  styleUrls: ['./cast-slidesshow.component.css']
})
export class CastSlidesshowComponent implements OnInit, AfterViewInit {
  @Input() cast: Cast[];
  public mySwiper: Swiper;


  constructor() { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper ('.swiper-container', {
      slidesPerView:5.3,
      freeMode: true,
      spaceBetween: 15,
   })
 }

 ngOnInit(): void {
  //  console.log( this.cast );
   
 }

}
