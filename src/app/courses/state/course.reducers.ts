import { EntityState } from '@ngrx/entity';

import { Course } from '../model/course';


/*
export interface CoursesState {
    entities: {[key: number]: Course},
    ids: number[]
}
*/


export interface CoursesState extends EntityState<Course>{

}

// We have the same format
let state: CoursesState;
state.entities;
state.ids