import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { CourseEntityService } from './course-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

    constructor(
        private courseEntityService: CourseEntityService 
    ) {}
    
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> {

            return this.courseEntityService.loaded$
                    .pipe(
                        tap((loaded) => !loaded ? this.courseEntityService.getAll().pipe(map(courses => !!courses)) : loaded),
                        take(1)
                    );
    }
}