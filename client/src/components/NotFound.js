import React from 'react';

const NotFoundPage = ({ title }) => {

    React.useEffect(() => {
        document.title = title; // Set the page title
      }, [title]);
    return (
        <div>
            <h1>404 Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFoundPage;