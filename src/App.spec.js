import { UserProvider } from '@application/context/UserContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  const user = {
    user: 'Felipe',
    setUser: jest.fn(),
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserProvider value={user}>
          <App />
        </UserProvider>
      </MemoryRouter>,
    );
  });

  it('should render the app navigation', () => {
    const navigation = screen.getByLabelText('app-navigation');
    expect(navigation).toBeInTheDocument();
  });
});
