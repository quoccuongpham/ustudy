import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import UserDetailView from 'src/sections/user-detail/view/user-detail-view';
export default function UserDetailPage() {
  const { uuid } = useParams();
  console.log(uuid);

  return (
    <>
      <Helmet>
        <title>UStudy | User Detail</title>
      </Helmet>
      <UserDetailView />
    </>
  );
}
