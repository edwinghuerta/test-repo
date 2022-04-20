import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private app: AppService, private router: Router) {
    if (localStorage.getItem('session-token'))
      this.router.navigateByUrl('/consumer/triggers');
    const sub = this.app.events
      .pipe(filter((e) => e.type === 'auth'))
      .subscribe((e) => {
        if (e.data) {
          this.router.navigateByUrl('/consumer/triggers');
          sub.unsubscribe();
        }
      });
  }

  ngOnInit(): void {}
}
