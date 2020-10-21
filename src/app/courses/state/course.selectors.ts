import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoursesState } from './course.reducers';
import * as fromCourses from './course.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
)

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectCoursesByCategory = createSelector(
    selectAllCourses,
    (courses, props) => courses.filter(course => {
        console.log(course.category);
        return course.category === props.category
    })
);

export const selectPromoTotoal = createSelector(
    selectAllCourses,
    (courses) => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
    selectCoursesState,
    (state) => state.allCoursesLoaded
);