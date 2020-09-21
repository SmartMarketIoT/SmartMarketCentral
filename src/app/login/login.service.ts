import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL_ROOT = 'http://34.70.244.238:1026/v2/entities?q=email==';
  URL_QUERY = '&attrs=*&type=Client';

  response: any;
  validPassword: boolean;
  name: string;

  constructor(private http: HttpClient) { }

  execute(user: string, senha: string): any{
    this.consultarHelix(user)
            .subscribe(value => {

              this.validarSenha(value, senha);

            });
  }

  consultarHelix(user: string): Observable<any>{
    return this.http.get(this.URL_ROOT + user + this.URL_QUERY);
  }

  validarSenha(userData: any, senha: string): void{

    if (typeof userData[0] === 'undefined' || typeof userData[0].password === 'undefined'){
      this.validPassword = false;
    } else{
      this.validPassword = userData[0].password.value === senha;
      this.name = userData[0].name.value;
    }

  }

}
