import { UserProvider } from '@application/context/UserContext';
import Home from '@presentation/pages/home/Home';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Home', () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <Home />
      </UserProvider>,
    );
  });

  it('should update input room state on change', () => {
    const input = screen.getByLabelText('room-input');
    fireEvent.change(input, { target: { value: 'Globant Bootcamp' } });
    expect(input.value).toBe('Globant Bootcamp');
  });

  it('should update series selected state on change', () => {
    const select = screen.getByLabelText('series-select');
    fireEvent.change(select, { target: { value: '0' } });
    expect(select.value).toBe('0');
  });
});
