import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ContactSection } from './contact-section';
import { ContactService } from '../../../../core/services/contact.service';

describe('ContactSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSection],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the form initially', () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should show success state when wasSuccessful is true', () => {
    const fixture = TestBed.createComponent(ContactSection);
    const contactService = TestBed.inject(ContactService);
    contactService['_success'].set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('¡Mensaje enviado!');
  });

  it('nameInvalid should be false when field is pristine', () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    expect(fixture.componentInstance.nameInvalid).toBe(false);
  });

  it('nameInvalid should be true when field is touched and empty', () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    const nameControl = fixture.componentInstance.form.get('name');
    nameControl?.markAsTouched();
    fixture.detectChanges();
    expect(fixture.componentInstance.nameInvalid).toBe(true);
  });

  it('emailInvalid should be true when email is invalid and touched', () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    const emailControl = fixture.componentInstance.form.get('email');
    emailControl?.setValue('not-an-email');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    expect(fixture.componentInstance.emailInvalid).toBe(true);
  });

  it('onSubmit should mark all touched when form is invalid', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    await fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.form.touched).toBe(true);
  });
});
