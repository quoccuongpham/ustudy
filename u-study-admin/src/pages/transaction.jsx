import { Helmet } from 'react-helmet-async';
import { TransactionView } from 'src/sections/transaction/view';
export default function Transaction() {
  return (
    <>
      <Helmet>
        <title>User | UStudy Admin</title>
      </Helmet>
      <TransactionView />
    </>
  );
}
