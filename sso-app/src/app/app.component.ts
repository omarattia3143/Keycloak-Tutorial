import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './sso.config';
import {LowerCasePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sso-app';
  // url = 'https://localhost:5051/'
  // url = 'https://localhost:7001/'
  // url = 'https://localhost:44332/'
  // url = 'http://15.185.222.48:5050/'

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configureSSO();

  }

  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }

  print() {
    console.log('access_token ', this.oauthService.getAccessToken());
    console.log('id_token ', this.oauthService.getIdToken());
  }

  login() {

    this.oauthService.initCodeFlow()

  }

  apiTest() {

    this.http.get('https://localhost:5001/WeatherForecast').subscribe((data) =>
      console.log(data)
    )
    console.log()
  }

  logout() {
    this.oauthService.revokeTokenAndLogout().then(r => this.oauthService.revocationEndpoint);

    //
    // this.oauthService.getIdToken();
    // this.oauthService.getAccessToken();
  }

}
