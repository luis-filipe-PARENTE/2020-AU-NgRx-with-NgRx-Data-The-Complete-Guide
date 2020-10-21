import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CoursesHttpService } from '../services/courses-http.service';
import { CoursesActions } from './action-types';


@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(() => this.actions$.pipe(
         ofType(CoursesActions.loadAllCourses),
         switchMap(() => this.coursesHttpService.findAllCourses()
            .pipe(
                map(courses => (CoursesActions.allCoursesLoaded({courses}))),
                catchError(({error}) => of(CoursesActions.allCoursesLoadedError({err: error}))) // just disconnect the server to see this error
            ))
        ));
        
      constructor(
        private actions$: Actions,
        private coursesHttpService: CoursesHttpService 
    ) {}

}