import { ReactElement } from 'react';
import { Modal, ModalProps, Box, Typography } from '@mui/material';
import XenButton from './XenButton';
import styled from '@emotion/styled';

interface CustomModalProps extends Omit<ModalProps, 'children'> {
  children: ReactElement<any, string | React.JSXElementConstructor<any>>;
  confirmFn: () => void,
  closeFn: (param1: boolean) => void
}

const ButtonContainer = styled('div')`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`

const XenConfirmationModal: React.FC<CustomModalProps> = ({ children, confirmFn, closeFn, ...rest }) => {
  return (
    <Modal sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }} {...rest}>
      <Box sx={{
        backgroundColor: 'white',
        width: '40vw',
        textAlign: 'center',
        margin: 'auto',
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '2rem',
        borderRadius: '20px'
      }}>
        <div>{children}</div>
        <ButtonContainer>
          <XenButton onClick={() => {
            confirmFn()
            closeFn(false)
          }}>Confirm</XenButton>
          <XenButton onClick={() => closeFn(false)}>Cancel</XenButton>
        </ButtonContainer>

      </Box>
    </Modal >
  );
};

export default XenConfirmationModal;
