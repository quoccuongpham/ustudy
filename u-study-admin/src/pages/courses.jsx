import { Helmet } from 'react-helmet-async';
import { CourseView } from 'src/sections/course/view';

export default function CoursePage() {
  return (
    <>
      <Helmet>
        <title>Courses | UStudy Admin</title>
      </Helmet>
      <CourseView />
    </>
  );
}
