import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { CourseEntityService } from '../services/course-entity.service';


@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  get loading$(): Observable<boolean> {
    return  this.courseEntityService.loading$;
  }

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

    this.isUpdateMode() 
      ? this.updateCourse(course)
      : this.addCourse(course);
 }

  private updateCourse(course: Course): void {
    this.courseEntityService.update(course);
    this.closeModal();
  }

  private addCourse(course: Course): void {
    this.courseEntityService.add(course).pipe(
      tap(newCourse => {
        console.log('New course', newCourse);
        this.closeModal();
      })
    ).subscribe();
  }

  private isUpdateMode(): boolean {
    return this.mode == 'update';
  }
  
  private closeModal(): void {
    this.dialogRef.close();
  }

}
