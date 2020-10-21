import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { Observable } from 'rxjs';
import { switchMap, take, tap, delay } from 'rxjs/operators';

import { CoursesActions } from './state/action-types';
import { areCoursesLoaded } from './state/course.selectors';

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

        this.sotre.pipe(
            select(areCoursesLoaded),
            delay(0),
            tap((areCoursesLoaded) => {
             console.log(`value of areCoursesLoaded: ${areCoursesLoaded}`);
             areCoursesLoaded 
                ? this.sotre.dispatch(CoursesActions.retreiveCoursesOnStore())
                : this.sotre.dispatch(CoursesActions.loadAllCourses());    
            
            }),
            take(1)
          ).subscribe();
        
          /// test.subscribe();
        

        // TODO: only for test!
        // setTimeout(() => {
        //     this.sotre.dispatch(CoursesActions.allCoursesLoaded({courses: []}))
        // }, 3000);

        return this.action$.pipe(
            // tap(() => console.log('all courses are loaded')),
            ofType(
                CoursesActions.allCoursesLoaded, 
                CoursesActions.retreiveCoursesOnStore
            ),
            tap(action => {
                console.log(`this is the action ${action.type}`);
            }),
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