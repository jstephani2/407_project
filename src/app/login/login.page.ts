import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

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

  constructor( public fAuth: AngularFireAuth ) { }

  ngOnInit() {
  }

  register() {
    this.fAuth.createUserWithEmailAndPassword(this.user.email,this.user.password)
    .then((res) => { if (res.user) console.log(res.user.uid) })
    .catch((e) => { console.log(e); })

  }
  login() {
    this.fAuth.signInWithEmailAndPassword(this.user.email,this.user.password)
    .then((res) => { console.log(res.user.uid); })
    .catch((e) => { console.log(e); })
  }

}
