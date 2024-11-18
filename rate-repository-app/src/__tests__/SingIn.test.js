import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockSubmit = jest.fn();

      render(<SignInContainer onSubmit={mockSubmit} />);

      fireEvent.changeText(screen.getByTestId('usernameInput'), 'username');
      fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');

      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1);

        expect(mockSubmit.mock.calls[0][0]).toEqual({
          username: 'username',
          password: 'password',
        });
      });
    });
  });
});
