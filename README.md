# Keycloak
Keycloak is an open source identity and access management solution.

this project consists of 2 projects:
1. keycloak.api: just an api that we protect
2. sso client: an angular client that using openid connect client https://github.com/manfredsteyer/angular-oauth2-oidc

steps:

1. installing keycloak using docker, using this command: 
docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak

2. go to localhost:8080, click on admin console and enter admin, admin as credentials 

3. follow this guide to create a new realm with new users https://www.keycloak.org/docs/latest/getting_started/index.html i have created sarmady realm, by default keycloak uses h2 database but any database can be linked with it including sql server (there is docker for everything)

4. create a client, I have created a "myclient" client with two important parameters you need to take into considerations:

- Valid Redirect URIs: give it value of * to accept any Redirect URI
- Web Origins: give it value of * to avoid CORS

5. now in order to include client name into audience follow those steps:

- Goto to the newly added "Client Scopes" menu [1]
- Add Client scope 'good-service'
- Within the settings of the 'good-service' goto Mappers tab
- Create Protocol Mapper 'my-app-audience'
- Name: my-app-audience
- Choose Mapper type: Audience
- Included Client Audience: my-app
- Add to access token: on
- Configure client my-app in the "Clients" menu
- Client Scopes tab in my-app settings
- Add available client scopes "good-service" to assigned default client scopes

copied from here: https://stackoverflow.com/questions/53550321/keycloak-gatekeeper-aud-claim-and-client-id-do-not-match

# API

1. add any jwt middleware you like, I have added Microsoft.AspNetCore.Authentication.JwtBearer
2. consider Authority to be http://localhost:8080/auth/realms/sarmady or your realm name, and Audience is the client name

3. protect your api with [Authorize] attribute

# SsoClient

1. install this https://github.com/manfredsteyer/angular-oauth2-oidc or any oidc client 
2. my configurations in sso.config.ts file:
```
import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8080/auth/realms/sarmady',
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  postLogoutRedirectUri: 'https://google.com/',
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'myclient',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
};

```
3. launch the app and open console
4. use login button to login you will be redirected to your realm
5. enter username and password
6. you will be redirected to your redirect URI
7. use print button to print access and id token into console
8. use test api button to send get request to the api and it will response into console