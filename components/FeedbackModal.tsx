import {useEffect, useRef, useState} from "react";
import {CgClose} from "react-icons/cg";

interface Props {
  isOpen: boolean,
  closeModal: () => void
}

const FeedbackModal = ({isOpen, closeModal}: Props) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
      setFeedbackText('');
      setEmail('');
      setSelectedRating(null);

      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEsc)
      };
    }
  }, [isOpen]);

  const handleClickOutside = (event: any) => {
    if ((isOpen && modalRef.current) && !modalRef.current.contains(event.target)) {
      closeModal();
      console.log("clicked outside");
    }
  };

  const handleEsc = (e: any) => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <div className={`${isOpen && 'show-modal'} modal z-50`}>
      <div
        ref={modalRef}
        className="modal-content dark:bg-zinc-900 bg-zinc-50 rounded border dark:border-zinc-700 border-zinc-400 w-[400px]">
        <div className=" flex flex-col px-5 pt-3">
          <div className="flex justify-between items-center mb-3">
            <h3
              className="font-semibold text-lg dark:text-zinc-300 text-zinc-700 transition duration-300 ease-in-out">Feedback</h3>
            <CgClose
              className="dark:text-zinc-500 hover:dark:text-zinc-50 text-zinc-500 hover:text-zinc-900 cursor-pointer transition duration-300 ease-in-out"
              size={22} onClick={closeModal}/>
          </div>
          <textarea
            ref={textareaRef}
            autoFocus
            rows={4}
            value={feedbackText}
            placeholder="Your feedback..."
            maxLength={5000}
            onChange={(e) => setFeedbackText(e.target.value)}
            className={`mb-3 rounded border dark:border-zinc-700 border-zinc-400 w-full py-2 px-4 dark:bg-zinc-900 bg-zinc-50 dark:text-gray-50 text-zinc-900 text-base focus:outline-none dark:focus:border-zinc-500 focus:border-zinc-800 transition duration-300 ease-out`}/>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Optional email address"
            className={`rounded border dark:border-zinc-700 border-zinc-400 w-full py-2 px-4 dark:bg-zinc-900 bg-zinc-50 dark:text-gray-50 text-zinc-900 text-base focus:outline-none dark:focus:border-zinc-500 focus:border-zinc-800 transition duration-300 ease-out`}
          />
        </div>

        <div
          className="flex justify-between items-center dark:bg-zinc-800 bg-zinc-200 mt-3 px-5 py-3 rounded-b border-t dark:border-zinc-700 border-zinc-400">
          <div className="flex space-x-3">
            <div
              onClick={() => setSelectedRating(4)}
              className={`${selectedRating === 4 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
              <div className="pt-0.5">&#129321;</div>
            </div>
            <div
              onClick={() => setSelectedRating(3)}
              className={`${selectedRating === 3 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
              <div className="pt-0.5">&#128515;</div>
            </div>
            <div
              onClick={() => setSelectedRating(2)}
              className={`${selectedRating === 2 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
              <div className="pt-0.5">&#128543;</div>
            </div>
            <div
              onClick={() => setSelectedRating(1)}
              className={`${selectedRating === 1 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
              <div className="pt-0.5">&#128545;</div>
            </div>

          </div>
          <div
            className="dark:shadow-none shadow dark:hover:bg-yellow-300 hover:bg-zinc-700 cursor-pointer dark:bg-yellow-400 bg-zinc-800 rounded dark:text-zinc-900 text-zinc-50 px-3 py-1 font-semibold transition duration-300 ease-in-out">Send
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;