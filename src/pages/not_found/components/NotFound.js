import React from 'react';

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return (
    <div>
      <p>404 Not Found</p>
    </div>
  )
};

export default NotFound
