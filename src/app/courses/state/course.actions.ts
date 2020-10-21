import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Course } from '../model/course';

export const loadAllCourses = createAction(
    '[ Courses Resolver ] Load All Courses'
);

export const allCoursesLoaded = createAction(
    '[ Load Courses Effect ] All Courses Loaded',
    props<{courses: Course[]}>()
);

export const retreiveCoursesOnStore = createAction(
    '[ Read courses from the store ] All Courses Loaded from the store'
);

export const allCoursesLoadedError = createAction(
    '[ Load Courses Effect (Error) ] All Courses Loaded with Error',
    props<{err: any}>()
);

export const courseUpdated = createAction(
    '[ Edit Course Dialog ] Course Updated',
    props<{update: Update<Course>}>()
);

