
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { log } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email: string = '';
  public password: string = '';
  public nameFile: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(event) {

    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    this.nameFile = file.name;
    const filePath = 'upload/profile_' + id + '_' + (file.name.split('.'))[0];
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();


  }
  onAddUser() {

    this.authService.registerUser(this.email, this.password).then((res) => {

      this.authService.isAuth().subscribe(user => {

        if (user) {

          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value

          }).then(() => {

            console.log('update');


          }).catch((err) => {

            console.log('err', err.message);


          });
        }

      });
      //this.router.navigate(['admin/list-books']);

    }).catch((err) => {

      console.log(err.message);

    });

  }


  onLoginGoogle() {

    this.authService.loginGoogleUser().then((res) => {

      this.onLoginRedirect();

    }).catch(err => {
      console.log(err);

    });



  }

  onLoginFacebook() {

    this.authService.loginFacebookUser().then((res) => {

      this.onLoginRedirect();

    }).catch((err) => {

      console.log(err);

    });

  }

  onLoginRedirect(): void {

    this.router.navigate(['admin/list-books']);

  }

}
