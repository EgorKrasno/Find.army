import {AiOutlineSearch} from "react-icons/ai";
import {IoClose} from "react-icons/io5";
import {useRef} from "react";

interface Props {
  text: string,
  setText: (text: string) => void,
}

const ExploreSearch = ({text, setText}: Props) => {
  const searchBarRef = useRef<HTMLInputElement>(null);

  const clearText = () => {
    setText('');
    focusSearchBar();
  };

  const focusSearchBar = () => searchBarRef.current && searchBarRef.current.focus();

  return (
    <div className="mx-auto md:w-[550px] mt-12 mb-24 shadow-md dark:shadow-none">
      <div className="relative w-full group">
        <AiOutlineSearch size={24}
                         className="top-1/2 left-4 absolute transform -translate-y-1/2 text-zinc-600 dark:text-zinc-400"/>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={searchBarRef}
          placeholder='Search'
          autoFocus={true}
          className="rounded-sm text-lg transition ease-in-out duration-300 focus:border-sky-700 dark:focus:border-yellow-400 hover:border-sky-600 dark:hover:border-yellow-400/40 bg-zinc-200 dark:bg-zinc-850 border border-zinc-400 text-black dark:text-slate-50 dark:border-zinc-600 outline-none py-2.5 pl-14 pr-6 w-full"/>

        {text.length > 0 &&
            <button
                data-testid='clear-search-button'
                aria-label="Clear search"
                onClick={clearText}
                className="flex top-1/2 right-4 absolute transform -translate-y-1/2 space-x-2">
                <IoClose
                    size={28}
                    className=" cursor-pointer text-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 text-zinc-500 dark:text-zinc-400 transition duration-300 ease-in-out"/>
            </button>}


      </div>
    </div>
  );
}

export default ExploreSearch;