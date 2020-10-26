import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const { params: {courseUrl} } = this.route.snapshot.paramMap as any;
    debugger;

    this.course$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.find(course => course.url === courseUrl))
    )

    // this.lessons$ = this.course$.pipe(
    //   concatMap(course => this.lessonEntityService.findLessons(course.id)),
    //   tap(console.log)
    // );

    this.lessons$ = of([]);

  }


  loadLessonsPage(course: Course) {

  }

}
