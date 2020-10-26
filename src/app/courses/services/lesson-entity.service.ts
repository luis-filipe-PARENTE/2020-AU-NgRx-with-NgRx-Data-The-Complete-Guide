import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Lesson } from '../model/lesson';

export const entityDataKeyLesson = 'Lesson';

@Injectable()
export class LessonEntityService extends EntityCollectionServiceBase<Lesson>{

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory
    ){
        super(entityDataKeyLesson, serviceElementsFactory);
    }
}