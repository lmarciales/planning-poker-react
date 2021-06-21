import CardToggle from '@presentation/components/cardToggle/CardToggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CardToggle', () => {
  it('should find the text of the element', () => {
    const series = { value: 1, toggle: false };
    render(<CardToggle item={series} />);

    const outputCard = screen.getByText('1');
    expect(outputCard).toBeInTheDocument();
  });

  it('should call toggle when clicked', () => {
    const series = { value: 1, toggle: true };
    const toggle = jest.fn();
    render(<CardToggle item={series} toggle={toggle} />);

    const cardElement = screen.getByText('1');
    userEvent.click(cardElement);

    expect(toggle).toBeCalledWith(series);
  });
});
