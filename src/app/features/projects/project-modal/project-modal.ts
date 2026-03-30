import { Component, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MarkdownComponent } from 'ngx-markdown';
import { Project } from '../../../core/models/project.model';
import { TagBadge } from '../../../shared/components/tag-badge/tag-badge';

@Component({
  selector: 'app-project-modal',
  imports: [MarkdownComponent, TagBadge],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.css'
})
export class ProjectModal {
  readonly project = inject<Project>(DIALOG_DATA);
  private dialogRef = inject(DialogRef);

  currentImage = signal(0);

  close(): void {
    this.dialogRef.close();
  }
}
