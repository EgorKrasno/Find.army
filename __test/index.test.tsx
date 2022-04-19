import {fireEvent, render, screen} from '@testing-library/react'
import Home from '../pages/index';
import '@testing-library/jest-dom'

describe('Home Page', () => {
  it('Renders navbar on Home Page', () => {
    render(<Home/>)
    expect(screen.getByText('Find.Army')).toBeInTheDocument()
  })

  it('Renders first and last block', () => {
    render(<Home/>)

    expect(screen.getByText('Email 365')).toBeInTheDocument();
    expect(screen.getByText('Recommendation for Award Form')).toBeInTheDocument();
  });

  it('Renders all blocks', () => {
    render(<Home/>)

    const blocks = screen.getAllByTestId('link-block');
    expect(blocks.length).toBe(48);
  });

  it('Search bar narrows down search', () => {
    render(<Home/>)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'tsp'}});

    expect(screen.getByText('TSP')).toBeInTheDocument();
    expect(screen.getAllByTestId('link-block').length).toBe(1);
  });

  it('Clicking clear search shows all blocks', () => {
    render(<Home/>)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'nothingmatches'}});
    expect(screen.queryAllByTestId('link-block').length).toBe(0);

    const clearSearchButton = screen.getByTestId('clear-search-button');
    fireEvent.click(clearSearchButton);

    expect(screen.getAllByTestId('link-block').length).toBe(48);
  });

  it('Bad search displays no results page with feedback button', () => {
    render(<Home/>)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'nothingmatches'}});

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Make a suggestion')).toBeInTheDocument();
    expect(screen.queryAllByTestId('link-block').length).toBe(0);
  });

  it('Clicking no results page feedback button shows feedback modal', () => {
    render(<Home/>)

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, {target: {value: 'nothingmatches'}});
    const feedbackButton = screen.getByText('Make a suggestion');
    fireEvent.click(feedbackButton);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
})