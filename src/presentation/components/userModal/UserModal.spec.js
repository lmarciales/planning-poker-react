import { UserProvider } from '@application/context/UserContext';
import UserModal from '@presentation/components/userModal/UserModal';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('UserModal', () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <UserModal />
      </UserProvider>,
    );
  });

  it('should find the welcome message', () => {
    const welcomeMessage = screen.getByText('welcome', { exact: false });
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('should set a new user', () => {
    const button = screen.getByRole('button');
    const input = screen.getByLabelText('user-input');
    fireEvent.change(input, { target: { value: 'Felipe' } });
    userEvent.click(button);

    expect(JSON.parse(localStorage.getItem('user')).name).toBe('Felipe');
  });

  it('should update input state on change', () => {
    const input = screen.getByLabelText('user-input');
    fireEvent.change(input, { target: { value: 'Felipe' } });
    expect(input.value).toBe('Felipe');
  });
});
