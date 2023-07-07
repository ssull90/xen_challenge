import { render, fireEvent } from '@testing-library/react';
import XenConfirmationModal from './XenConfirmationModal';
import { vi } from 'vitest'

describe('XenConfirmationModal', () => {
  it('renders the modal with the provided children', () => {
    const modalContent = 'Modal Content';
    const { getByText } = render(
      <XenConfirmationModal open={true} confirmFn={vi.fn()} closeFn={vi.fn()}>
        <span>{modalContent}</span>
      </XenConfirmationModal>
    );
    const contentElement = getByText(modalContent);
    expect(contentElement).toBeInTheDocument();
  });

  it('calls the confirmFn and closeFn when Confirm button is clicked', () => {
    const confirmFnMock = vi.fn();
    const closeFnMock = vi.fn();
    const { getByText } = render(
      <XenConfirmationModal open={true} confirmFn={confirmFnMock} closeFn={closeFnMock}>
        <span>Modal Content</span>
      </XenConfirmationModal>
    );
    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(confirmFnMock).toHaveBeenCalledTimes(1);
    expect(closeFnMock).toHaveBeenCalledWith(false);
  });

  it('calls the closeFn when Cancel button is clicked', () => {
    const closeFnMock = vi.fn();
    const { getByText } = render(
      <XenConfirmationModal open={true} confirmFn={vi.fn()} closeFn={closeFnMock}>
        <span>Modal Content</span>
      </XenConfirmationModal>
    );
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(closeFnMock).toHaveBeenCalledWith(false);
  });
});
