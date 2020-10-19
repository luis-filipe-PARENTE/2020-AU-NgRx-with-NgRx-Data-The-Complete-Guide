import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { Observable } from 'rxjs';

import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { Course } from '../model/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import * as coursesSelectors from '../state/course.selectors' 



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    loading$: Observable<boolean>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private store: Store<AppState>
    ) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {
    this.beginnerCourses$ = this.store.pipe(
      select(coursesSelectors.selectCoursesByCategory, { category :'BEGINNER' })
    )

    this.advancedCourses$ = this.store.pipe(
      select(coursesSelectors.selectCoursesByCategory, { category :'ADVANCED' })
    )
    
    this.promoTotal$ = this.store.pipe(
      select(coursesSelectors.selectPromoTotoal)
    )
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
