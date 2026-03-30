import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isSending as false initially', () => {
    expect(service.isSending()).toBe(false);
  });

  it('should have wasSuccessful as false initially', () => {
    expect(service.wasSuccessful()).toBe(false);
  });

  it('should have errorMessage as null initially', () => {
    expect(service.errorMessage()).toBeNull();
  });

  it('should reset state on reset()', () => {
    service['_success'].set(true);
    service['_error'].set('some error');
    service.reset();
    expect(service.wasSuccessful()).toBe(false);
    expect(service.errorMessage()).toBeNull();
  });
});
