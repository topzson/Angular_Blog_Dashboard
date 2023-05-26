import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail: string | undefined;
  isLoggedIn$: Observable<boolean> | undefined
  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      const user = JSON.parse(storedUser);
      this.userEmail = user.email;
    }
    this.isLoggedIn$ = this.authService.isLoggedIn();

    
  }

  onlogOut(){
    this.authService.logOut();
  }
}
