
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = '92kOSGrqjbv73iaSRBlvB53h7qt0aeSN';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //CONVIERTE EL RESULTADO DEL HISTORIAL EN UN ARREGLO PARA QUE PUEDA VALIDARSE .parse (convierte json(string) a un objeto)
    // if (localStorage.getItem('historial')) {                             // SIGNO ! PARA DECIR QUE PASE LA INSTRUCCION, SIGNO || SIGNIFICA 'O'
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);    //CUMPLEN LA MISMA FUNCION DE LA DE ARRIBA
    // }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];  
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)) {              // SI EL INPUT NO INVLUYE LO INGRESADO ENTONCES LO AGREGA
      this._historial.unshift(query);

      this._historial = this._historial.splice(0,15);     //LIMITA SOLO MOSTRAR 15 ITEMS DE HISTORIAL

      localStorage.setItem('historial', JSON.stringify(this._historial));  // INSTRUCCION PARA GRABAR EN EL LOCAL STORAGE DEL NAVEGADOR EL HISTORIAL DE BUSQUEDA
                                                                          // JSON.stringify CONVIERTE A STRING UN OBJETO 
    }

    //CONSTRUCCION DE PARAMETROS DE BUSQUEDA EN LA API (COMO LO HACE POSTMAN)
    const params = new  HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '15')
          .set('q', query);

    //CONEXION A API GIPHY
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
          .subscribe( (resp) => {
            this.resultados = resp.data;

            localStorage.setItem('resultados', JSON.stringify(this.resultados));  //GRABA LOS RESULTADOS EN LOCAL STORAGE PARA QUE SE MANTENGAN LOS RESULTADOS AL CARGAR LA PAGINA
          });

  }
}

