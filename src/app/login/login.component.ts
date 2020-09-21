import { LoginService } from './login.service';
import { AuthenticatorService } from '../authenticator.service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  senha: string;
  display: boolean;

  ngOnInit(): void{
  }

  constructor(private router: Router, private loginService: LoginService, private messageService: MessageService) {

  }

  autenticar(): void{
    let dateObg = new Date('08-13-2020 05:35:32');
    console.log(dateObg.getDate());
    this.loginService.execute(this.user, this.senha);
    this.display = true;

    if (!this.loginService.validPassword){
      this.messageService.add({severity: 'error',
      summary: 'Ops',
      detail: 'Seu usuário e/ou senha estão inválidos. Por favor verificar.',
      life: 1000});
  } else {
      this.router.navigate(['home'], {queryParams: {name: this.loginService.name}});
  }

  }


}
