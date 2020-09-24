import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  URL_ROOT = 'http://34.70.244.238:1026/v2/entities?q=email==';

  URL_QUERY = 'Giovanna@market.com&attrs=*&type=Client';

  constructor(private http: HttpClient) { }


  consultar(): Observable<any>{
    const vixi = this.http.get(this.URL_ROOT);
    return vixi;

  }


}
