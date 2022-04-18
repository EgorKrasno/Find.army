interface Props {
  openModal: () => void,
  style?: any,
  text: string
}

const FeedbackButton = ({openModal, style, text}: Props) => {
  return (<button
    aria-label={`${text} button`}
    onClick={openModal}
    tabIndex={0}
    className={`${style} dark:bg-zinc-900 bg-zinc-50 font-semibold rounded-sm py-2 px-4 ease-in-out cursor-pointer border border-zinc-400 dark:border-zinc-700 shadow dark:shadow-none`}
  >
    {text}
  </button>)
}

export default FeedbackButton;