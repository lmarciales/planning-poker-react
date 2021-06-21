import { UserProvider } from '@application/context/UserContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import Room from '@presentation/pages/room/Room';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

library.add(faShareSquare);

describe('Room', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Room />
        </UserProvider>
      </MemoryRouter>,
    );
  });

  it('should call navigator when icon clicked', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    const shareIcon = screen.getByLabelText('share-icon');
    userEvent.click(shareIcon);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
