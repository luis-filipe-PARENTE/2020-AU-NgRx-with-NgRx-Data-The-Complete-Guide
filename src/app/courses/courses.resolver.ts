import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { CoursesActions } from './state/action-types';

@Injectable({
    providedIn: 'root'
})
export class CourseResolverService implements Resolve<any>{

    private fetchingCourses: boolean = false;

    constructor(
        private sotre: Store<AppState>,
        private action$: Actions
    ) {}
    
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) : Observable<any>
    {

        this.sotre.dispatch(CoursesActions.loadAllCourses())

        // TODO: only for test!
        // setTimeout(() => {
        //     this.sotre.dispatch(CoursesActions.allCoursesLoaded({courses: []}))
        // }, 3000);

        return this.action$.pipe(
            tap(() => console.log('all courses are loaded')),
            ofType(CoursesActions.allCoursesLoaded),
            take(1) 
        )

        /*
        return this.sotre
        .pipe(
            filter(_ => !this.fetchingCourses), 
            tap(() => {
                this.fetchingCourses = true;
                this.sotre.dispatch(CoursesActions.loadAllCourses())
                setTimeout(() => {
                    this.sotre.dispatch(CoursesActions.allCoursesLoaded({courses: []}))
                }, 6000);
            }),
            first(),
            delay(5000),
            finalize(() => this.fetchingCourses = false)
            )    
        */
        
    }
}