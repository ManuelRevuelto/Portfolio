import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { AnimatedEntry } from '../../../../shared/directives/animated-entry.directive';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, AnimatedEntry, SectionHeader],
  templateUrl: './contact-section.html'
})
export class ContactSection {
  readonly contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get nameInvalid(): boolean {
    const c = this.form.get('name');
    return !!(c?.invalid && c.touched);
  }

  get emailInvalid(): boolean {
    const c = this.form.get('email');
    return !!(c?.invalid && c.touched);
  }

  get messageInvalid(): boolean {
    const c = this.form.get('message');
    return !!(c?.invalid && c.touched);
  }

  onFocus(event: FocusEvent): void {
    const el = event.target as HTMLElement;
    el.style.borderColor = 'var(--color-accent)';
  }

  onBlur(event: FocusEvent): void {
    const el = event.target as HTMLElement;
    el.style.borderColor = '';
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, message } = this.form.getRawValue();
    await this.contactService.send({ name, email, message });
    if (this.contactService.wasSuccessful()) {
      this.form.reset();
    }
  }
}
