import { TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ProjectModal } from './project-modal';
import { Project } from '../../../core/models/project.model';
import { provideMarkdown } from 'ngx-markdown';

const mockProject: Project = {
  slug: 'test-project',
  title: 'Test Project',
  description: 'A test project',
  tags: ['Angular', 'TypeScript'],
  githubUrl: 'https://github.com/test',
  liveUrl: 'https://test.com',
  images: ['/img1.png', '/img2.png'],
};

const mockDialogRef = {
  close: vi.fn(),
};

describe('ProjectModal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectModal],
      providers: [
        { provide: DIALOG_DATA, useValue: mockProject },
        { provide: DialogRef, useValue: mockDialogRef },
        provideMarkdown(),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display project title', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Project');
  });

  it('should display project tags', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    expect(fixture.nativeElement.textContent).toContain('TypeScript');
  });

  it('should start on image 0', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    expect(fixture.componentInstance.currentImage()).toBe(0);
  });

  it('should call dialogRef.close on close()', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    fixture.detectChanges();
    fixture.componentInstance.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should show GitHub link', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    fixture.detectChanges();
    const githubLink = fixture.nativeElement.querySelector('a[href="https://github.com/test"]');
    expect(githubLink).toBeTruthy();
  });

  it('should show live demo link', () => {
    const fixture = TestBed.createComponent(ProjectModal);
    fixture.detectChanges();
    const liveLink = fixture.nativeElement.querySelector('a[href="https://test.com"]');
    expect(liveLink).toBeTruthy();
  });
});
