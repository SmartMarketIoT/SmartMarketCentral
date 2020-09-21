import { AuthenticatorService } from './authenticator.service';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'dashboard-smartmarket';
  disabled: boolean = true;

  value1: string;

  value2: string;

  value3: string;

  value4: string;

  value5: string = 'Disabled';

  data: any;

  constructor(private authenticatorService: AuthenticatorService) {

  }

  ngOnInit(){

  }

}
