import { Helmet } from 'react-helmet-async';
import { AddAdminView } from 'src/sections/addAdmin/view';
export default function AddAdminPage() {
  return (
    <>
      <Helmet>
        <title>User | UStudy Admin</title>
      </Helmet>
      <AddAdminView />
    </>
  );
}
