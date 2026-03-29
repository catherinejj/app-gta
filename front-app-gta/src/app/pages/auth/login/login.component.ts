import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login({ email: email.trim().toLowerCase(), password }).subscribe({
      next: () => void this.router.navigateByUrl('/home'),
      error: (error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(this.mapErrorMessage(error));
      },
      complete: () => this.isSubmitting.set(false),
    });
  }

  protected showEmailError(): boolean {
    const control = this.loginForm.controls.email;
    return control.invalid && (control.dirty || control.touched);
  }

  protected showPasswordError(): boolean {
    const control = this.loginForm.controls.password;
    return control.invalid && (control.dirty || control.touched);
  }

  private mapErrorMessage(error: { error?: { message?: string | string[] } }): string {
    const backendMessage = error.error?.message;

    if (Array.isArray(backendMessage)) {
      return backendMessage[0] ?? 'Connexion impossible pour le moment.';
    }

    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }

    return 'Connexion impossible pour le moment.';
  }
}
