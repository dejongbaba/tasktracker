import {Component} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithRedirect} from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private fireAuth:Auth) {
  }


  loginWithGoogle(){
    signInWithRedirect(this.fireAuth, new GoogleAuthProvider()).then(r => {
      // redirect to url
      console.log('res',r)
    });
  }
}
