import {CoursesModule} from '../courses.module';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Course } from '../model/course';


@Injectable({
    providedIn: CoursesModule
})
export class CourseEntityService extends EntityCollectionServiceBase<Course> {

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory
    ){
        super('Course', serviceElementsFactory);
    }

}