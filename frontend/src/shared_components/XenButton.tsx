import { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const XenButton: React.FC<CustomButtonProps> = ({ children, ...rest }) => {
  return (
    <Button {...rest} sx={{ border: '4px solid #cacaca', color: 'black', borderRadius: '20px', minWidth: '120px' }}>
      {children}
    </Button>
  );
};

export default XenButton;