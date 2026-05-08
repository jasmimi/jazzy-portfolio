import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import App from './App';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

test('renders pixel book nook with home content by default', () => {
  render(<App />);

  expect(screen.getByTestId('pixel-book-nook')).toHaveAttribute('data-wip-mode', 'false');
  expect(screen.getByRole('button', { name: /home/i })).toBeEnabled();
  expect(screen.getByTestId('page-reader')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
});

test('opens page content when a live mode book is selected', () => {
  render(<App wipMode={false} />);

  fireEvent.click(screen.getByRole('button', { name: /inside jaz's mind/i }));

  expect(screen.getByTestId('page-reader')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /inside jaz's mind/i })).toBeInTheDocument();
  expect(window.location.hash).toBe('#/inside-jazs-mind');
});

test('keeps page content closed when WIP mode is on', () => {
  render(<App wipMode />);

  fireEvent.click(screen.getByRole('button', { name: /jaz spottings/i }));

  expect(screen.queryByTestId('page-reader')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /jaz spottings/i })).toBeDisabled();
  expect(screen.getByText(/wip/i)).toBeInTheDocument();
});
