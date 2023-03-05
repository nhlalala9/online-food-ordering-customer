import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import { StorageService } from '../../service/storage.service';
import { ToastService } from '../../service/toast.service';
// import { AuthServiceService } from 'src/app/Authentication/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });


  private loginSub: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private toast: ToastService,
    private ss: StorageService

  ) {}

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  login() {
    const credentials = this.loginForm.value;

    this.loginSub = this.auth.login(
      credentials.email,
      credentials.password
    ).subscribe(
      resp => {
        this.loginForm.reset();

        this.auth.persistUser(resp);

        this.toast.showSuccess('Successfully logged in.');

        const attemptedRoute = this.ss.getItem('attemptedRoute');
        this.ss.removeItem('attemptedRoute');
        this.router.navigateByUrl(attemptedRoute || '/customer/home')
      },
      () => {
        this.toast.showDanger('Login unsuccessful. Check your credentials.');
      }
    );
  }
  
  ngOnInit(): void {}
}
