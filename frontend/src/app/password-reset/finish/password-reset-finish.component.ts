import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordResetFinishService } from './password-reset-finish.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['../password-reset.component.scss']
})
export class PasswordResetFinishComponent implements OnInit {
  doNotMatch?: string | null;
  error?: string | null;
  keyMissing?: boolean | null;
  success?: string | null;
  key?: string | null;

  loading = false;

  passwordForm? = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  constructor(
    private router: Router,
    public translate: TranslateService,
    private passwordResetFinishService: PasswordResetFinishService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.key = params['key'];
    });
    this.keyMissing = !this.key;
  }

  finishReset() {
    this.doNotMatch = null;
    this.error = null;
    const password = this.passwordForm?.get(['newPassword'])?.value;
    const confirmPassword = this.passwordForm?.get(['confirmPassword'])?.value;
    if (password !== confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.loading = true;
      this.passwordResetFinishService.save({ key: this.key, newPassword: password }).subscribe(
        () => {
          this.loading = false;
          this.success = 'OK';
          this.login();
        },
        err => {
          this.loading = false;
          this.success = null;
          this.error = err.error;
        }
      );
    }
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  login() {
    this.router.navigate(['/']);
  }
}
