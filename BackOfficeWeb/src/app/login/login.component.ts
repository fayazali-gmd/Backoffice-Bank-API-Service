import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
//, private authService: AuthService
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      PasswordHash: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: () => {
            this.errorMessage = 'Invalid username or password.';
          },
        });
    }
  }
}
