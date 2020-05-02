import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user:User = new User();

  constructor( public fAuth: AngularFireAuth, private router: Router ) { }

  ngOnInit() {
  }

  register() {
    this.fAuth.createUserWithEmailAndPassword(this.user.email,this.user.password)
    .then((res) => {
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigateByUrl('/list')
      }
    })
    .catch((e) => { console.log(e); })
  }
  login() {
    this.fAuth.signInWithEmailAndPassword(this.user.email,this.user.password)
    .then((res) => {
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigateByUrl('/list')
      }
    })
    .catch((e) => { console.log(e); })
  }

}
