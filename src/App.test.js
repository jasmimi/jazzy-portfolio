import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import App from './App';

jest.mock('./components/BookshelfScene', () => function MockBookshelfScene({
  books,
  onSelectBook,
  wipMode,
}) {
  return (
    <div data-testid="bookshelf-scene" data-wip-mode={String(wipMode)}>
      {wipMode && <span>Warning tape</span>}
      {books.map((book) => (
        <button
          disabled={wipMode}
          key={book.path}
          onClick={() => onSelectBook(book.path)}
          type="button"
        >
          {book.label}
        </button>
      ))}
    </div>
  );
});

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

test('renders WIP bookshelf with disabled page books by default', () => {
  render(<App />);

  expect(screen.getByTestId('bookshelf-scene')).toHaveAttribute('data-wip-mode', 'true');
  expect(screen.getByText(/warning tape/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /home/i })).toBeDisabled();
  expect(screen.queryByTestId('page-reader')).not.toBeInTheDocument();
});

test('opens page content when a live mode book is selected', async () => {
  render(<App readerDelayMs={0} wipMode={false} />);

  fireEvent.click(screen.getByRole('button', { name: /inside jazs mind/i }));

  expect(await screen.findByTestId('page-reader')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /inside jazs mind/i })).toBeInTheDocument();
});

test('keeps page content closed when WIP mode is on', () => {
  render(<App readerDelayMs={0} wipMode />);

  fireEvent.click(screen.getByRole('button', { name: /jaz spottings/i }));

  expect(screen.queryByTestId('page-reader')).not.toBeInTheDocument();
});
