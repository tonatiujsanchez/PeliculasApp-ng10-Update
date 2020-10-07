import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform( image: string ): string {
    
    if( image == null || image == undefined ){
      return 'assets/img/no-image.jpg'
    }    
    
    return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+image;
  }

}
