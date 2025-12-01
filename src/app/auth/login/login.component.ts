import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //Reactive form group for managing form data
  form: FormGroup;
  // Flag to show/hide loading spinner during API calls
  loading = false;
  //Dependency Injection: Services and Angular utilities
  constructor(
    fb: FormBuilder, // Used to build the reactive form
    private auth: AuthService, // Handles the actual login API Call
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute // Reads route parameters(like returnUrl)
  ) {
    // Initialize form controls with validation rules
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  // Submit the login form data
  submit() {
    if (this.form.valid) return;
    const { email, password } = this.form.value;
    this.loading = true; // start loading
    // Call the login service and subscribe to the result
    this.auth.login(email, password).subscribe({
      // Success handler
      next: (user) => {
        this.loading = false; // Stop loading
        this.toast.success('Welcome', `Logged in as ${user.role}`);
        // Determine where to navigate
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || 'dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      // Error Handler
      error: () => {
        this.loading = false; // Stop loading
        this.toast.error('Login failed', 'Invalid credentials');
      },
    });
  }
}
