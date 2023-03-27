import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    
  constructor (private gifsService: GifsService) {}

    get historial() {
      return this.gifsService.historial;
    }

    buscar(termino: string) {
      this.gifsService.buscarGifs(termino);   //MANDA A LLAMAR LOS RESULTADOS DE BUSQUEDA EN EL SERVICIO
    }
}
