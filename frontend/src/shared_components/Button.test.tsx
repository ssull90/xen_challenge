import { render, fireEvent } from '@testing-library/react';
import XenButton from './XenButton';
import { vi } from 'vitest'

describe('XenButton', () => {
  it('renders the button with the provided children', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<XenButton>{buttonText}</XenButton>);
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = vi.fn();
    const { getByText } = render(<XenButton onClick={onClickMock}>Click me</XenButton>);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
