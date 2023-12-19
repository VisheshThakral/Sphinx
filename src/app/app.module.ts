import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { TweetComponent } from './components/utilities/tweet/tweet.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { NumberFormatDirective } from './directives/number-format.directive';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TweetComponent,
    TweetListComponent,
    TooltipDirective,
    NumberFormatDirective,
    LoginComponent,
    SignupComponent,
    FooterComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
