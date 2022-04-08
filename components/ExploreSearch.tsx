import {AiOutlineSearch} from "react-icons/ai";
import {IoClose} from "react-icons/io5";
import {useRef} from "react";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";

interface Props {
  text: string,
  setText: (text: string) => void,
  favorite: boolean,
  setFavorite: (favorite: boolean) => void,

}

const ExploreSearch = ({text, setText, favorite, setFavorite}: Props) => {
  const searchBarRef = useRef<HTMLInputElement>(null);

  const clearText = () => {
    setText('');
    focusSearchBar();
  };

  const handleBookmark = () => {
    setFavorite(!favorite);
    focusSearchBar();
  };

  const focusSearchBar = () => searchBarRef.current && searchBarRef.current.focus();

  return (
    <div className="mx-auto md:w-[550px] mt-16 mb-20 shadow dark:shadow-none">
      <div className="relative w-full group">
        <AiOutlineSearch size={24}
                         className="top-1/2 left-4 absolute transform -translate-y-1/2 text-zinc-600 dark:text-zinc-400"/>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          ref={searchBarRef}
          placeholder='Search'
          autoFocus={true}
          className="rounded text-lg transition ease-in-out duration-300 focus:border-zinc-900 dark:focus:border-yellow-400 hover:border-zinc-500 dark:hover:border-yellow-400/40 bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 text-black dark:text-slate-50 dark:border-zinc-600 outline-none py-2.5 pl-14 pr-6 w-full"/>
        <div
          onClick={handleBookmark}
          className="top-1/2 cursor-pointer right-4 absolute transform -translate-y-1/2 text-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 text-zinc-500 dark:text-zinc-400 transition duration-300 ease-in-out"
        >
          {favorite ? <FaBookmark size={20}/> : <FaRegBookmark size={20}/>}
        </div>

        {text.length > 0 &&
            <div className="flex top-1/2 right-12 absolute transform -translate-y-1/2 space-x-2">
                <IoClose
                    onClick={clearText}
                    size={28}
                    className=" cursor-pointer  text-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 text-zinc-500 dark:text-zinc-400 transition duration-300 ease-in-out"/>
                <div className="border-r border-zinc-700"/>
            </div>}


      </div>
    </div>
  );
}

export default ExploreSearch;