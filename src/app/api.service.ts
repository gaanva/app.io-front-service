import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import config from '../../auth_config.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$() {
    return this.http.get('https://backend-service-fragrant-paper-2350.fly.dev/api/external');
  }
}
