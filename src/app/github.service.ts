import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

const client_id = 'Your_Client_id';
const redirect_uri = 'Your_Redirect_uri';
const scopes = 'Your_Scopes'
const state = 'Your_State_to_verify_no_temparing'

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(
    private readonly oAuthService: OAuthService,
    private http: HttpClient
  ) {}

  githubLogin() {
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.append('client_id', client_id);
    url.searchParams.append('redirect_uri', redirect_uri);
    url.searchParams.append('scope', scopes);
    url.searchParams.append('state', state);
    window.location.href = url.toString();
  }

  githubGetAccessToken(code: string) {
    return this.http.get('http://localhost:3000/userData/' + code);
  }
}
