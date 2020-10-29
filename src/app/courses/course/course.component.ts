import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { noop, Observable } from 'rxjs';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';

import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, OnChanges {

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  disableBtnLoadMore: boolean = false;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  get loading$(): Observable<boolean> {
      // Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'
      // In the same run detection change we have in the first time the value false and in the first emition of lessonEntityService the 
      // Value of true
      // So we need to add a pipe with delay, 
      return this.lessonEntityService.loading$.pipe(delay(0));
  }

  constructor(
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    // const courseUrl = this.route.snapshot.paramMap.get('courseUrl'); //better
    const { params: {courseUrl} } = this.route.snapshot.paramMap as any;

    this.course$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.find(course => course.url === courseUrl))
    )

    // this.lessons$ = this.course$.pipe(
    //   concatMap(course => this.lessonEntityService.findLessons(course.id)),
    //   tap(console.log)
    // );

    this.lessons$ = this.lessonEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([, course]) => !this.nextPage ? this.loadLessonsPage(course): noop),
      map(([lessons, course]) => lessons.filter(lesson => lesson.courseId === course.id))
    );
  }

  loadLessonsPage(course: Course) {

    this.lessonEntityService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    }).pipe(
      tap(lessons => this.disableBtnLoadMore = !lessons.length)
    ).subscribe();

    this.nextPage++;  
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes........');
    console.log({changes});
  }


}
