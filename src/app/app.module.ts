import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SphinxComponent } from './components/utilities/sphinx/sphinx.component';
import { SphinxListComponent } from './components/sphinx-list/sphinx-list.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { NumberFormatDirective } from './directives/number-format.directive';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShortenPipe } from './pipes/shorten.pipe';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { LoadingComponent } from './components/utilities/loading/loading.component';
import { SearchInputComponent } from './components/utilities/search-input/search-input.component';
import { SphinxModalComponent } from './components/utilities/sphinx-modal/sphinx-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    HeaderComponent,
    HomeComponent,
    SphinxComponent,
    SphinxListComponent,
    TooltipDirective,
    NumberFormatDirective,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    LoadingComponent,
    SearchInputComponent,
    SphinxModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
