import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { entityDataKeyCourse } from './course-entity.service';



@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator
    ){
        super(entityDataKeyCourse, http, httpUrlGenerator);
    }

    getAll(): Observable<Course[]> {
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            )
    }

    update(update: Update<Course>): Observable<Course> {
        return this.http.put<Course>(`/api/course/${update.id}`, {update})
            .pipe(
                tap(data => console.log(`this the data ${JSON.stringify(data)}`)),
                catchError((error) => {
                   return throwError({error : this.getServerErrorMessage(error)});
                })
               )
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
}