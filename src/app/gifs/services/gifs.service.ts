import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

//este es el decorador que usamos cuando queremos crear un servicio
@Injectable({
	providedIn: 'root', //con esta linea especificamos que el sericio va a ser unico y global en el root
	//no es necesario declararlo en el modulo
})
export class GifsService {
	private apiKey: string = '2YS6W7eKOEP6zStcBokC00sAmmbDP6OC';
	private servicioUrl = 'https://api.giphy.com/v1/gifs';
	private _historial: string[] = [];

	public resultados: Gif[] = [];

	get historial() {
		return [...this._historial]; //lo usamos con el spread operator(...) para devolver
		//una copia de _historial, ya que los arreglos y objetos se pasan por refernecia
		//y si no lo hacemos de de esta forma y se modifica  _historial, se vera afectada tambien
		//cualquier referencia a este, ya con la copia evitamos esto
	}

	//Inyectamos la dependencia de HttpClient
	constructor(private http: HttpClient) {
		this._historial = JSON.parse(localStorage.getItem('gifApp')!) || [];
		this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
	}

	buscarGift(query: string) {
		query = query.trim().toLocaleLowerCase(); //primero llevamos todo a minusculas par no tener la misma
		//busqueda solo diferenciada por letras mayusculas o minusculas
		//si existe no hacemos nada para no tener duplicados
		if (!this._historial.includes(query)) {
			this._historial.unshift(query); //insertamos el query al principio del arreglo
			this._historial = this._historial.splice(0, 10); //nos quedamos solamente con los primeros 10 querys
			//para mantener un historial de solo 10 busquedas

			localStorage.setItem('gifApp', JSON.stringify(this._historial));
		}

		const params = new HttpParams() //creamos este objeto con los parametros que le pasaremos al url
			.set('api_key', this.apiKey)
			.set('limit', '10')
			.set('q', query);

		this.http
			//a get le podemos pasar como segundo argumento el objeto con los parametros que queremos poner en la url y ya el se encaarga de concatenarlos todos de forma correcta
			.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {
				params: params,
			})
			.subscribe((result) => {
				// console.log(result.data);
				this.resultados = result.data;
				localStorage.setItem(
					'resultados',
					JSON.stringify(this.resultados)
				);
			});

		// console.log(this._historial);
	}
}
