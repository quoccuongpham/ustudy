import { Helmet } from 'react-helmet-async';
import { SystemView } from 'src/sections/system/view';

export default function SystemPage() {
  return (
    <>
      <Helmet>
        <title>UStudy Admin | System</title>
      </Helmet>

      <SystemView />
    </>
  );
}
