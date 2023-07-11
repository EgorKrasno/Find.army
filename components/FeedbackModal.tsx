import {useEffect, useRef, useState} from "react";
import {CgClose} from "react-icons/cg";
import {FaCheck} from "react-icons/fa";
import {SiSpinrilla} from "react-icons/si";
import Image from 'next/image'

interface Props {
  isOpen: boolean,
  closeModal: () => void
}

const FeedbackModal = ({isOpen, closeModal}: Props) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
      setFeedbackText('');
      setEmail('');
      setSelectedRating(null);
      setIsSubmitting(false);
      setSubmitted(false);

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEsc)
      };
    }
  }, [isOpen]);

  const submitFeedback = () => {
    if (feedbackText.trim().length > 0) {
      const data = {
        text: feedbackText,
        email,
        rating: selectedRating
      };

      setIsSubmitting(true);
      fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        if (res.status === 200) {
          setSubmitted(true);
          setTimeout(() => {
            closeModal();
          }, 2000);
        }
      });
    } else {
      setIsSubmitting(false);
      setSubmitted(true);
      closeModal();
    }
  }

  const handleClickOutside = (event: any) => {
    if (submitted) return;
    if ((isOpen && modalRef.current) && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleEsc = (e: any) => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <div className={`${isOpen && 'show-modal'} modal z-50`}>
      <div

        className="modal-content dark:bg-zinc-900 bg-zinc-50 rounded-sm border dark:border-zinc-700 border-zinc-400 w-full md:w-[525px]">
        {!submitted ? <div ref={modalRef}>
            <div className=" flex flex-col px-5 pt-3">
              <div className="flex justify-between items-center mb-3">
                <p
                  className="font-semibold text-lg dark:text-zinc-300 text-zinc-700 transition duration-300 ease-in-out">Feedback</p>
                <CgClose
                  className="dark:text-zinc-500 hover:dark:text-zinc-50 text-zinc-500 hover:text-zinc-900 cursor-pointer transition duration-300 ease-in-out"
                  size={22} onClick={closeModal}/>
              </div>
              <textarea
                ref={textareaRef}
                autoFocus
                required
                rows={7}
                value={feedbackText}
                placeholder="Your feedback..."
                maxLength={5000}
                onChange={(e) => setFeedbackText(e.target.value)}
                className={`mb-3 rounded-sm border dark:border-zinc-700 border-zinc-400 w-full py-2 px-4 dark:bg-zinc-900 bg-zinc-50 dark:text-gray-50 text-zinc-900 text-base focus:outline-none dark:focus:border-yellow-400 focus:border-zinc-800 transition duration-300 ease-out`}/>
              <input
                type="text"
                value={email}
                maxLength={200}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional email address"
                className={`rounded-sm border dark:border-zinc-700 border-zinc-400 w-full py-2 px-4 dark:bg-zinc-900 bg-zinc-50 dark:text-gray-50 text-zinc-900 text-base focus:outline-none dark:focus:border-yellow-400 focus:border-zinc-800 transition duration-300 ease-out`}
              />
            </div>

            <div
              className="flex justify-between items-center dark:bg-zinc-800 bg-zinc-200 mt-3 px-5 py-3 rounded-b-sm border-t dark:border-zinc-700 border-zinc-400">
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedRating(4)}
                  tabIndex={0}
                  className={`${selectedRating === 4 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
                  <Image  src='/image/emoji/emoji_1.webp' alt='Very satisfied reaction' width={24} height={24}/>
                </button>
                <button
                  onClick={() => setSelectedRating(3)}
                  tabIndex={0}
                  className={`${selectedRating === 3 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
                  <Image src='/image/emoji/emoji_2.webp' alt='satisfied reaction' width={24} height={24}/>
                </button>
                <button
                  onClick={() => setSelectedRating(2)}
                  tabIndex={0}
                  className={`${selectedRating === 2 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
                  <Image src='/image/emoji/emoji_3.webp' alt='ok reaction' width={24} height={24}/>
                </button>
                <button
                  onClick={() => setSelectedRating(1)}
                  tabIndex={0}
                  className={`${selectedRating === 1 ? 'dark:border-yellow-400 border-zinc-900 dark:shadow-none shadow-lg shadow-zinc-900/40' : 'dark:hover:border-zinc-500 hover:border-zinc-700'} w-[34px] h-[34px] transition duration-300 ease-in-out border dark:border-zinc-700 border-zinc-400 text-2xl rounded-full flex justify-center items-center cursor-pointer`}>
                  <Image src='/image/emoji/emoji_4.webp' alt='not satisfied reaction' width={24} height={24}/>
                </button>

              </div>
              <button
                disabled={isSubmitting || feedbackText.trim().length <= 0}
                onClick={submitFeedback}
                className={`dark:disabled:hover:bg-yellow-400 disabled:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-auto flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 focus:ring-offset-zinc-200 focus:ring-sky-700 dark:focus:ring-yellow-400 dark:shadow-none shadow dark:hover:bg-yellow-300 hover:bg-sky-600 cursor-pointer dark:bg-yellow-400 bg-sky-700 rounded-sm dark:text-zinc-900 text-zinc-50 h-8 w-20 font-semibold transition duration-300 ease-in-out`}>
                {isSubmitting ? <SiSpinrilla className="dark:text-zinc-900 animate-spin" size={18}/> : 'Submit'}
              </button>
            </div>
          </div> :
          <div className="text-xl w-full h-[291px] space-y-4 flex flex-col justify-center items-center">
            <FaCheck size={112} className={`fade-in dark:text-yellow-400 text-sky-700`}/>
            <p className="fade-in-delay text-4xl font-bold">Thank you!</p>
          </div>
        }
      </div>
    </div>
  );
};

export default FeedbackModal;