import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Course } from '../model/course';
import { CoursesActions } from './action-types';


/*
export interface CoursesState {
    entities: {[key: number]: Course},
    ids: number[]
}
*/


export interface CoursesState extends EntityState<Course>{}

// We have the same format
// let state: CoursesState;  state.entities; state.ids

export const adapter = createEntityAdapter<Course>();
export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CoursesActions.allCoursesLoaded, (state, action)=> adapter.addAll(action.courses, state))
)

export const {
    selectAll
} = adapter.getSelectors();

