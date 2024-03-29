import {BsFillGrid3X2GapFill} from "react-icons/bs";
import {useState} from "react";
import {FaIdCard, FaLock} from "react-icons/fa";

export interface Item {
  id: string;
  title: string,
  icon: any,
  cac?: boolean,
  nipr?: boolean,
  href: string,
  description?: string,
}

interface Props {
  item: Item,
  text: string,
  isDragging: boolean,
  attributes?: any,
  listeners?: any,
  isOverlay: boolean,
}

const LinkBlock = ({item, text, isDragging, attributes, listeners, isOverlay}: Props) => {
  const [copiedHref, setCopiedHref] = useState('');
  const [isChildHovered, setIsChildHovered] = useState(false);

  const copyToClipboard = (href: string) => {
    navigator.clipboard.writeText(href).then((r) => {
      setCopiedHref(href);
      setTimeout(() => {
        setCopiedHref('');
      }, 3000);
    });
  };

  return (
    !(isDragging && !isOverlay) ?
      <>
        <div
          className={`${isDragging ? 'z-50' : 'z-10'} col-span-4 cursor-pointer `}
        >
          <div className="relative w-full h-full grid grid-rows-explore-tabs">
            <a
              data-testid='link-block'
              href={item.href}
              target="_blank" rel="noreferrer noopener"
              tabIndex={0}
              className={`${!isOverlay && 'transition duration-300 '} ${!isChildHovered && 'sm:hover:ring'}
                relative aspect-h-4 aspect-w-3 rounded-sm group
                dark:hover:ring-yellow-400 h-full
                hover:ring-zinc-900 ring-offset-zinc-200
                dark:ring-offset-zinc-900 ring-offset-4 ease-in-out 
                dark:focus:ring-yellow-400 focus:ring focus:outline-none dark:focus:ring-offset-zinc-800 focus:ring-sky-700
                `}>
              <div
                className={`${isDragging ? 'shadow-2xl dark:shadow-yellow-400/50 shadow-zinc-900/80' : 'shadow-md dark:shadow-none'} block w-full h-full bg-cover bg-center dark:border-zinc-700 border border-zinc-400 transition-all duration-300 ease-in-out
                  rounded-sm bg-no-repeat bg-zinc-200 dark:bg-zinc-850 flex justify-center items-center`}>
                {item.icon}
              </div>
              <button
                aria-label='Copy link to clipboard'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  copyToClipboard(item.href);
                }}
                tabIndex={0}
                onMouseEnter={() => setIsChildHovered(true)}
                onMouseLeave={() => setIsChildHovered(false)}
                className={`${!isOverlay && 'transition-all duration-300 '} ${isDragging && 'hidden'} focus:opacity-100 active:ring-0 dark:focus:ring-yellow-400 focus-visible:ring focus:outline-none dark:focus:ring-offset-zinc-800 focus:ring-zinc-900 left-3.5 absolute bg-zinc-900 dark:bg-zinc-200 text-zinc-50 dark:text-zinc-900 font-semibold z-20 cursor-pointer hover:ring dark:hover:ring-yellow-300 hover:ring-zinc-900 ring-offset-4 dark:ring-offset-zinc-800 rounded-sm py-1.5 px-5 top-3.5 opacity-100 sm:opacity-0 group-hover:opacity-100 ease-in-out`}>
                {copiedHref.length > 0 && copiedHref === item.href
                  ? 'Copied!'
                  : 'Copy Link'}
              </button>
              <div
                className={`${!isOverlay && 'transition-all duration-300'} absolute top-3.5 right-3.5 opacity-100 ease-in-out z-20 `}>
                {text.length <= 0 && (
                  <button
                    aria-label="Drag to reorder"
                    {...attributes}
                    {...listeners}
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    className={`${!isOverlay && 'transition duration-300 '} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} focus:opacity-100 sm:opacity-0 dark:focus:ring-yellow-400 focus:ring focus:outline-none dark:focus:ring-offset-zinc-800 focus:ring-zinc-900 group-hover:opacity-100 dark:hover:bg-zinc-700 hover:bg-zinc-300 rounded-sm px-2 py-1 flex justify-center items-center ease-in-out`}>
                    <BsFillGrid3X2GapFill
                      className={`${isDragging ? 'dark:text-yellow-400 text-blue-500' : 'dark:text-zinc-300 text-zinc-700'} outline-none focus:outline-none transition duration-300 ease-in-out' }`}
                      size={24}/>
                  </button>
                )}
              </div>

              <h2
                className={`${!isOverlay && 'transition-all duration-300 '} ${isDragging && 'hidden'} 
                    w-full h-full text-base opacity-100 sm:opacity-0 ease-in-out pr-12 group-focus:opacity-100
                    group-hover:opacity-100 text-zinc-800 dark:text-zinc-300 flex
                    flex-col-reverse px-3 py-1.5 absolute bottom-0 left-0 rounded-sm font-semibold text-sm`}>
                {item.description}
              </h2>

              <div
                className={`${!isOverlay && 'transition-all duration-300 '} ${isDragging && 'hidden'} flex flex-col justify-center items-center absolute bottom-1 right-3 mx-3 opacity-100 sm:opacity-0 group-hover:opacity-100 ease-in-out z-50`}>
                {item.cac && <>
                    <FaIdCard className="text-zinc-900 dark:text-yellow-300" size={24}/>
                    <span className="text-zinc-700 font-semibold dark:text-zinc-300 text-xs">CAC</span>
                </>
                }
                {item.nipr && <>
                    <FaLock className="text-zinc-900 dark:text-green-400" size={24}/>
                    <span className="text-zinc-700 font-semibold dark:text-zinc-300 text-xs">NIPR</span>
                </>}

              </div>
            </a>
          </div>
        </div>
        <div
          className="font-semibold leading-[1.15em] text-[42px] text-black dark:text-zinc-50 mt-4 row-span-1 transition duration-300 ease-in-out">
          <h1>{item.title}</h1>
        </div>
      </> :
      <div
        className={`z-10 group col-span-4 mb-16 cursor-pointer ring ring-zinc-600 ring-1 rounded-sm`}
      >
        <div className="w-full h-full grid grid-rows-explore-tabs"/>
      </div>
  );
}

export default LinkBlock;