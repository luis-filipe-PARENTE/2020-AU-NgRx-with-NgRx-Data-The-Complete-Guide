import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { Observable } from 'rxjs';
import { delay, filter, finalize, first, tap } from 'rxjs/operators';

import { CoursesActions } from './state/action-types';

@Injectable({
    providedIn: 'root'
})
export class CourseResolverService implements Resolve<any>{

    private fetchingCourses: boolean = false;

    constructor(
        private sotre: Store<AppState>
    ) {}
    
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) : Observable<any>
    {
    
        return this.sotre
             .pipe(
                filter(_ => !this.fetchingCourses), 
                tap(() => {
                    this.fetchingCourses = true;
                    this.sotre.dispatch(CoursesActions.loadAllCourses())
                }),
                first(),
                // delay(5000),
                finalize(() => this.fetchingCourses = false)
             )    
    }


}