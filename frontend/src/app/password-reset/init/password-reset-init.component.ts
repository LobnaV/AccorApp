import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PasswordResetInitService } from './password-reset-init.service';

@Component({
  selector: 'app-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['../password-reset.component.scss']
})
export class PasswordResetInitComponent {
  error?: string | null;
  errorEmailNotExists?: string | null;
  success?: string | null;

  resetRequestForm? = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]]
  });

  constructor(
    private passwordResetInitService: PasswordResetInitService,
    private elementRef: ElementRef,
    private fb: FormBuilder
  ) {}

  requestReset() {
    this.error = null;
    this.errorEmailNotExists = null;

    this.passwordResetInitService.save(this.resetRequestForm?.get(['email'])?.value).subscribe(
      () => {
        this.success = 'OK';
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }
}
