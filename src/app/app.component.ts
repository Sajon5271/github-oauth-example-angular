import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gitOauthTest';
  constructor(
    private githubLogin: GithubService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute.queryParams.subscribe((params) => {
          if (params['state'] === 'Your_State_to_verify_no_temparing') {
            this.githubLogin
              .githubGetAccessToken(params['code'])
              .subscribe((res) => console.log(res));
            console.log(params);
          } else {
            this.githubLogin.githubLogin();
          }
        });
      }
    });
  }
}
