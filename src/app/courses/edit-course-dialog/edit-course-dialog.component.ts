import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { noop, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CourseEntityService } from '../services/course-entity.service';


@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$:Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private courseEntityService: CourseEntityService
  ) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.closeModal();
  }

  onSave() {

    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    this.isUpdateMode 
      ? this.courseEntityService.update(course)
      : noop();

    this.closeModal();
  }

  private isUpdateMode(): boolean {
    return this.mode == 'update';
  }
  
  private closeModal(): void {
    this.dialogRef.close();
  }

}
