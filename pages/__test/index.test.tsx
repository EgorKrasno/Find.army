import {fireEvent, render, screen} from '@testing-library/react'
import Home from '../index';
import '@testing-library/jest-dom'

describe('Home Page', () => {
  it('renders first and last block', () => {
    render(<Home />)

    expect(screen.getByText('Email 365')).toBeInTheDocument();
    expect(screen.getByText('Recommendation for Award Form')).toBeInTheDocument();
  });

  it('renders all blocks', () => {
    render(<Home />)

    const blocks = screen.getAllByTestId('link-block');
    expect(blocks.length).toBe(48);
  });

  it('search bar narrows down search', () => {
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'tsp'}});

    expect(screen.getByText('TSP')).toBeInTheDocument();
    expect(screen.getAllByTestId('link-block').length).toBe(1);
  });

  it('clicking clear search shows all blocks', () => {
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'nothingmatches'}});
    expect(screen.queryAllByTestId('link-block').length).toBe(0);

    const clearSearchButton = screen.getByTestId('clear-search-button');
    fireEvent.click(clearSearchButton);

    expect(screen.getAllByTestId('link-block').length).toBe(48);
  });

  it('bad search displays no results page with feedback button', () => {
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'nothingmatches'}});

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Make a suggestion')).toBeInTheDocument();
    expect(screen.queryAllByTestId('link-block').length).toBe(0);
  });
})