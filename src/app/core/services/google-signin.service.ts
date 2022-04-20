import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { Observable, ReplaySubject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  constructor(
    private readonly router: Router,
    private zone: NgZone,
    private auth: AuthService,
    private readonly app: AppService,
  ) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '964059680966-lpq9bi386j6s85oeuhnvrq5rvudhqdgn.apps.googleusercontent.com',
        fetch_basic_profile: false,
        scope: 'email',
      });
      console.log(this.auth2);
    });
  }

  public signIn(authLogin: boolean = true) {
    console.log('I am passing signIn');

    var auth2 = gapi.auth2.getAuthInstance();         
      // Sign the user in, and then retrieve their ID.
      auth2.signIn().then(() => {
        console.log(auth2.currentUser.get().getAuthResponse().id_token);
        this.auth.signinSocial({
          token: auth2.currentUser.get().getAuthResponse().id_token,
          social: 'google',
          remember: false
        },
        authLogin
        ).then(data => {
          console.log(data);
          if (authLogin) {
            this.app.events.emit({ type: 'auth', data: data });
          }else{
            this.zone.run(() =>{
              this.app.events.emit({ type: 'singleAuth', data: data });
            })
          }
        })
        return auth2.currentUser.get().getBasicProfile();
      });         
 }

  public signout() {
    this.auth2.signOut().then(() => {});
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }

  navigate() {
    this.zone.run(() => {
      this.router.navigate(['affiliate-data-entry']);
    });
  }
}
