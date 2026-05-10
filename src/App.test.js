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

test('embeds Jaz in Summer social videos', () => {
  render(<App wipMode={false} />);

  fireEvent.click(screen.getByRole('button', { name: /jaz in summer/i }));

  expect(screen.getByRole('heading', { name: /jaz in summer/i })).toBeInTheDocument();
  expect(screen.getAllByTitle(/embedded instagram video/i)).toHaveLength(5);
  expect(screen.getByTitle(/summer 25\/26 embedded instagram video/i)).toHaveAttribute(
    'src',
    'https://www.instagram.com/reel/DVesnPwk9Fo/embed',
  );
  expect(screen.getAllByRole('link', { name: /watch on facebook/i })).toHaveLength(2);
});

test('keeps page content closed when WIP mode is on', () => {
  render(<App wipMode />);

  fireEvent.click(screen.getByRole('button', { name: /jaz spottings/i }));

  expect(screen.queryByTestId('page-reader')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /jaz spottings/i })).toBeDisabled();
  expect(screen.getByText(/wip/i)).toBeInTheDocument();
});
