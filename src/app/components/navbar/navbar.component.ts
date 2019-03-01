import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private router: Router) { }

  public app_name = 'Books Store';
  public isLogged = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {

      if (auth) {

        this.isLogged = true;

      } else {

        this.isLogged = false;
      }
    });


  }

  onLogout() {

    this.authService.logoutUser().then((res) => {

      this.router.navigate(['user/login']);

    }).catch((err) => {

      console.log(err);

    });

  }

}
