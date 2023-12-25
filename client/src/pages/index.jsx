// ./pages/index.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page when the component mounts
    router.push('/login');
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {/* Optional content for the home page */}
    </div>
  );
};

export default HomePage;
