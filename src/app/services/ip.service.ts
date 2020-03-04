import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IP } from '../interfaces/interfaces';
import { TOKEN_API_GEO } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  constructor(private http: HttpClient) {}

  getIp() {
    let url: string = 'https://api.ipify.org/?format=json';
    return this.http.get(url).pipe(map((resp: IP) => resp.ip));
  }

  getGeoIp(ip: string) {
    let url: string = `https://geo.ipify.org/api/v1?apiKey=${TOKEN_API_GEO}&ipAddress=${ip}`;
    return this.http.get(url);
  }
}
