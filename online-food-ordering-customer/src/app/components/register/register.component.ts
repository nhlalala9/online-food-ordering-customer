import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import { StorageService } from '../../service/storage.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  private registrationSub: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private ss: StorageService,
    private toast: ToastService
  ) {}

  ngOnDestroy(): void {
    if (this.registrationSub) {
      this.registrationSub.unsubscribe();
    }
  }

  get password() { return this.signupForm.get('password'); }
    
      signup() {
        const user = this.signupForm.value;
    
        this.registrationSub = this.auth.register(
          user.username,
          user.email,
          user.password
        ).subscribe(
          resp => {
            this.signupForm.reset();
    
            this.auth.persistUser(resp);
    
            this.toast.showSuccess('Successfully created account.');
    
            const attemptedRoute = this.ss.getItem('attemptedRoute');
            this.ss.removeItem('attemptedRoute');
            this.router.navigateByUrl(attemptedRoute || '')
          },
          () => {
            this.toast.showDanger('There was a problem registering your account.');
          }
        );
      }

  ngOnInit(): void {}
}
