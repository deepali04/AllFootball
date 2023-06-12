import React from 'react';

import '../App.css';

function Home({ title }) {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);
  return (
    <div>
      <h2>This is the Home page</h2>
    </div>
  );
}

export default Home;
