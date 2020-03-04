import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { IpService } from './services/ip.service';
import { Tarjeta, Mapa } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  ip: string;
  ciudad: string;
  isp: string;
  error: boolean = false;
  mapaCoor: Mapa;
  loadingIp: boolean;
  loadingInfo: boolean;
  copiada: boolean = false;
  fecha: number = new Date().getFullYear();
  tarjetas: Array<Tarjeta> = [
    {
      titulo: 'Dirección IP',
      descripcion:
        'La dirección IP es un conjunto de números que identifica, de manera lógica y jerárquica, a una Interfaz en red (elemento de comunicación/conexión) de un dispositivo (computadora, laptop , teléfono inteligente) que utilice el protocolo o (Internet Protocol), que corresponde al nivel de red del modelo TCP/IP.',
      url: 'https://es.wikipedia.org/wiki/Direcci%C3%B3n_IP'
    },
    {
      titulo: 'ISP',
      descripcion:
        'El proveedor de servicios de Internet, (ISP, por las siglas en inglés de Internet service provider) es la empresa que brinda conexión a Internet a sus clientes. Un ISP conecta a sus usuarios a Internet a través de diferentes tecnologías como ADSL, cablemódem, GSM, dial-up, etc.',
      url: 'https://es.wikipedia.org/wiki/Proveedor_de_servicios_de_Internet'
    }
  ];

  constructor(private ipService: IpService) {}

  ngOnInit() {
    this.obtenerIp();
  }

  obtenerIp() {
    this.loadingIp = true;
    this.loadingInfo = true;

    this.ipService.getIp().subscribe(
      (resp) => {
        // Obteniendo la dirección IP
        this.ip = resp;

        this.loadingIp = false;

        this.ipService.getGeoIp(this.ip).subscribe(
          (resp: any) => {
            // Obteniendo el nombre del ISP
            this.isp = resp.isp;

            // Destructurando el objecto recibido para obtener la localización
            const { city, lat, lng } = resp.location;
            this.mapaCoor = { lat, lng };
            this.ciudad = city;

            this.loadingInfo = false;
          },
          () => (this.error = true)
        );
      },
      () => (this.error = true)
    );
  }

  marcadorInfo(marcador: MapMarker) {
    this.infoWindow.open(marcador);
  }
}
