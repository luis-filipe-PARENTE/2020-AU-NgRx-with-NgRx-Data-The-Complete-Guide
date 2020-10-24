import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router/router';

import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { CoursesResolver } from './services/course-resolver.service';

export const coursesRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      resolve: {
        courses: CoursesResolver
      }
  
    },
    {
      path: ':courseUrl',
      component: CourseComponent
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(coursesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers:[
      CoursesResolver
    ]
})
export class CourseRoutingModule {}