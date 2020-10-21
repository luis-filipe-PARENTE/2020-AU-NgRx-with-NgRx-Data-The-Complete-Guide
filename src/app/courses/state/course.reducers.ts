import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { compareCourses, Course } from '../model/course';
import { CoursesActions } from './action-types';


/*
export interface CoursesState {
    entities: {[key: number]: Course},
    ids: number[]
}
*/


export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

// We have the same format
// let state: CoursesState;  state.entities; state.ids

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    // selectId: (course) => course.id when is id you don't need to specify selectId, for instance if you have course.courseId
});
export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
  
    on(CoursesActions.allCoursesLoaded, (state, action)=> adapter.addAll(
        action.courses, {
        ...state,
        allCoursesLoaded: true
    })),
  
    on(CoursesActions.courseUpdated, (state, action)=> adapter.updateOne(action.update, state))
)

export const {
    selectAll
} = adapter.getSelectors();

