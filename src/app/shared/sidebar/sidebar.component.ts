import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	//inyectamos la dependencia de GiftService en el constructor como es un servicio solo hay una sola instancia de este(como un singleton)
	//con el servivio manejamos el estado de nuestra aplicacion, es como un scope global para toda la aplicacion
	constructor(private gifsService: GifsService) {}

	get historial(): string[] {
		//si no se pone como un get y se pone como una variable normal no se actualiza cuando se actualiza el servicio, ya que cuando se actualiza el componente en el html, este pedira el valor de la variable y esta no estara actualizada, sin embargo al hacer el get, este buscara el valoe en el servicio
		return this.gifsService.historial;
	}

	buscarGifs(query: string) {
		console.log('desde el sidebar', query);
		this.gifsService.buscarGift(query);
	}
}
