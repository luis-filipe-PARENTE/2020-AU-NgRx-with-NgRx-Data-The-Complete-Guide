
export interface Course {
  courseId: number;
  seqNo:number;
  url:string;
  iconUrl: string;
  courseListIcon: string;
  description: string;
  longDescription?: string;
  category: string;
  lessonsCount: number;
  promo: boolean;
}

export function compareCourses(c1:Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}
