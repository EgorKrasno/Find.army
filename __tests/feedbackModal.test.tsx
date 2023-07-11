import {fireEvent, render, screen} from '@testing-library/react'
import FeedbackModal from "../components/FeedbackModal";
import '@testing-library/jest-dom'

const renderFeedbackModal = () => render(<FeedbackModal closeModal={jest.fn()} isOpen={true}/>)

describe('Feedback Modal', () => {

  it('renders to screen', () => {
    renderFeedbackModal();
    expect(screen.getByPlaceholderText('Your feedback...')).toBeInTheDocument()
  })

  it('submit button is disabled when feedback modal first loads', () => {
    renderFeedbackModal();
    expect(screen.getByRole('button', {name: /submit/i})).toBeDisabled()
  })

  it('submit button is enabled when there is text in the feedback input', () => {
    renderFeedbackModal();
    const feedbackInput = screen.getByPlaceholderText('Your feedback...');
    fireEvent.change(feedbackInput, {target: {value: 'test'}})
    expect(screen.getByRole('button', {name: /submit/i})).not.toBeDisabled()
  });


})
