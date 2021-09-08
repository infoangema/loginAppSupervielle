import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { ErrorDialogComponent } from './shared/components/dialogs/error-dialog/error-dialog.component';
import { RequesterService } from './services/requester.service';
import { HttpService } from './services/http.service';
import { NavComponent } from './shared/components/nav/nav.component';






@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    ErrorDialogComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,


  ],
  entryComponents:[ErrorDialogComponent],

  providers: [
    RequesterService,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
