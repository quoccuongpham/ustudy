import { useParams } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import {
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Chip,
  Button,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

export default function UserDetailPage() {
  const { uuid } = useParams();

  const router = useRouter();

  const [userData, setUserData] = useState();
  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:3001/admin/profile?uuid=' + uuid, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (res.status === 200) {
        setUserData(res.data);
      }
    })();
  }, [uuid]);

  const courses = useMemo(() => userData?.courses ?? [], [userData?.courses]);
  console.log(userData);
  const renderTeacher = (
    <>
      <Typography variant="h5" marginTop={5}>
        Courses
      </Typography>
      {courses?.length === 0 && (
        <Typography variant="body2" color="gray">
          No courses
        </Typography>
      )}

      {courses?.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Create</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.title}</TableCell>
                <TableCell>
                  {course.category && <Chip label={course.category.description} />}
                </TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>
                  {course.createdAt && new Date(course.createdAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>
                  {course.updateAt && new Date(course.updateAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>{course._count?.payments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

  const renderStudent = (
    <>
      <Typography variant="h5" marginTop={5}>
        Courses
      </Typography>
      {courses?.length === 0 && (
        <Typography variant="body2" color="gray">
          No courses
        </Typography>
      )}

      {courses?.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Create</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course?.course?.title}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      course?.course?.price
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  {course.createdAt && new Date(course.createdAt).toLocaleDateString('vi-VN')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );

  return (
    <div>
      <Button onClick={() => router.back()}>&lt; Back</Button>
      <div style={{ display: 'flex', marginTop: 20 }}>
        {userData?.user && (
          <>
            <Avatar src={userData?.user.avatarUrl} sx={{ width: 100, height: 100 }} />
            <div style={{ marginLeft: 20 }}>
              <Typography variant="h4">{userData?.user.name}</Typography>
              <Typography variant="body2" color="gray">
                {userData?.user.email}
              </Typography>
              <Typography variant="body2" color="gray">
                {userData?.user.role}
              </Typography>
            </div>
          </>
        )}
      </div>
      {userData?.user?.role === 'TEACHER' ? renderTeacher : renderStudent}
    </div>
  );
}
