import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const FormLoader = () => {
  return (
    <>
      <Skeleton height={20} count={4} />
      <Skeleton height={15} count={2} />
    </>
  );
};

export default FormLoader;
