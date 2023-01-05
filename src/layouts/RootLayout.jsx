import { Suspense } from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import IssueTracker from '../pages/IssueTracker';

const RootLayout = () => {
  return (
    <Layout>
      <Header />
      <Suspense fallback={<div>Loading</div>}>
        <IssueTracker />
      </Suspense>
    </Layout>
  );
};

export default RootLayout;

const Layout = styled.div`
  position: relative;
  height: 100vh;
`;
