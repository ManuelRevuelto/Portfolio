import { Injectable, signal } from '@angular/core';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  recaptchaToken?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private _sending = signal(false);
  private _success = signal(false);
  private _error = signal<string | null>(null);
  private recaptchaSiteKey: string | null = null;
  private recaptchaKeyLoaded = false;

  readonly isSending = this._sending.asReadonly();
  readonly wasSuccessful = this._success.asReadonly();
  readonly errorMessage = this._error.asReadonly();

  private async loadRecaptchaKey(): Promise<string> {
    if (this.recaptchaKeyLoaded) {
      return this.recaptchaSiteKey || '';
    }

    try {
      const response = await fetch('/api/config');
      const config = (await response.json()) as { recaptchaSiteKey: string };
      this.recaptchaSiteKey = config.recaptchaSiteKey;
    } catch (err) {
      console.warn('[ContactService] Failed to load reCAPTCHA config:', err);
    }

    this.recaptchaKeyLoaded = true;
    return this.recaptchaSiteKey || '';
  }

  private async getRecaptchaToken(): Promise<string | null> {
    if (!window.grecaptcha) {
      console.warn('[ContactService] reCAPTCHA not loaded');
      return null;
    }

    const siteKey = await this.loadRecaptchaKey();
    if (!siteKey) {
      console.warn('[ContactService] reCAPTCHA site key not configured');
      return null;
    }

    return window.grecaptcha.execute(siteKey, {
      action: 'contact_form',
    });
  }

  async send(form: ContactForm): Promise<void> {
    this._sending.set(true);
    this._success.set(false);
    this._error.set(null);

    try {
      const recaptchaToken = await this.getRecaptchaToken();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...(recaptchaToken && { recaptchaToken }) }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      this._success.set(true);
    } catch {
      this._error.set('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      this._sending.set(false);
    }
  }

  reset(): void {
    this._success.set(false);
    this._error.set(null);
  }
}
