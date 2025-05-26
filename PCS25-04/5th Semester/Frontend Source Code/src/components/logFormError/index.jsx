import React from 'react';
import { useFormContext } from 'react-hook-form';

const LogFormError = () => {
  const {
    formState: { errors }
  } = useFormContext();
  const [isClinet, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClinet) {
    console.log(errors);
  }

  return <></>;
};

export default LogFormError;
