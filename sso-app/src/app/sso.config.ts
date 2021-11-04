import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  // issuer: 'https://idsvr4.azurewebsites.net',
  issuer: 'http://localhost:8080/auth/realms/sarmady',
  // issuer: 'https://localhost:7001',
  // issuer: 'https://15.185.222.48:7001',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  // redirectUri: 'com.skylabs.carwa  sh',

  postLogoutRedirectUri: 'https://google.com/',

  // redirectUri: 'https://localhost:5001/signin-oidc',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'spa',
  clientId: 'myclient',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email',
  // scope: 'openid profile offline_access api',

  showDebugInformation: true,
};
