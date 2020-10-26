import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Course } from '../model/course';

export const entityDataKeyCourse = 'Course';


@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory
    ){
        super(entityDataKeyCourse, serviceElementsFactory);  // ==>  @seeAlso [courses.module.ts] this key name is what ngrx data use to make calls to the backend, but it plurilize it /courses
    }

}