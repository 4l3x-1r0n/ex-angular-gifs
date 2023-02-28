import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styles: [],
})
export class BusquedaComponent {
	@ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
	//@ViewCild lo que hace es seleccionar el elemento que tiene la refereancia local que le pasamos entre()
	//y lo asigna al nombre que especifiquemos despues del() en este caso se llama igual, con essto y apodemos
	//hacer referenci al elemento como si lo ubieramos seleccionado con un querySelector normal
	//se le pone un ! al final para indicarle a typescrip que estamos seguros de que el elemento existe yq que
	//el se queja porque es posible que el elemento que estamos seleccionando sea nulo(esto se conoce como Non-null assertion operator)
	//despues indicamos que es de tipo ElemenRef(que es lo que devuelve) y como ElementRef es generico
	//le especificamos entre <> que es un input(HTMLInputElement) de esta forma ya tendremos todo el tipado

	//inyectamos la dependencia de GiftService en el constructor como es un servicio solo hay una sola instancia de este(como un singleton)
	//con el servicio manejamos el estado de nuestra aplicacion, es como un scope global para toda la aplicacion
	constructor(private gifsService: GifsService) {}

	buscar() {
		const valor = this.txtBuscar.nativeElement.value; //esta es la formade obtener el valor de un elemento html,
		//fijarse que hay que usar nativeElement

		if (!valor.trim()) {
			return;
		}

		this.gifsService.buscarGift(valor); //insertamos el texto a buscar en el servicio
		this.txtBuscar.nativeElement.value = '';
	}
}
