import { HomeService } from './home/home.service';
import { PurchasesService } from './purchases/purchases.service';
import { StockService } from './stock/stock.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login/login.service';
import { AuthenticatorService } from './authenticator.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DialogModule} from 'primeng/dialog';

import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { StockComponent } from './stock/stock.component';
import {CardModule} from 'primeng/card';
import { PurchasesComponent } from './purchases/purchases.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import {SidebarModule} from 'primeng/sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {OrderListModule} from 'primeng/orderlist';
import {SelectButtonModule} from 'primeng/selectbutton';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
    { path: 'stock', component: StockComponent },
    { path: 'login', component: LoginComponent },
    { path: 'purchases', component: PurchasesComponent },
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    StockComponent,
    PurchasesComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ChartModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DialogModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    SidebarModule,
    DataViewModule,
    OrderListModule,
    FormsModule,
    SelectButtonModule,
    FontAwesomeModule
  ],
  providers: [AuthenticatorService, LoginService, StockService, PurchasesService, MessageService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
