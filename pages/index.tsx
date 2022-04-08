import Fuse from 'fuse.js';
import {useEffect, useState} from 'react';
import {FaBookmark, FaRegBookmark} from 'react-icons/fa';
import {GiCardRandom, GiClothes, GiComputing, GiHealthNormal,} from 'react-icons/gi';
import {AiOutlineMail} from 'react-icons/ai';
import {MdAttachMoney} from 'react-icons/md';
import {BsFillBriefcaseFill} from 'react-icons/bs';
import Link from 'next/link';
import ExploreSearch from "../components/ExploreSearch";

const iconProps = {
  className: 'text-zinc-400',
  size: 128,
};

const exploreData = [
  {
    title: 'MySquad',
    description: 'Test 1 description',
    href: 'mysquad url',
    swf: true,
    tags: [],
  },
  {
    title: 'Blast Radius',
    description: 'Test 2 description',
    href: 'blast radius url',
    swf: true,
    tags: ['blast radius'],
  },
  {
    title: 'Carrera',
    description: 'Test 3 description',
    href: 'arc url',
    swf: true,
    tags: ['jobs', 'national', 'guard', 'national guard', 'career'],
  },
  {
    title: 'Preventive Maintenance Checks and Services (PMCS)',
    swf: true,
    href: 'pmcs url',
    description: 'Test 4 description',
    tags: ['pmcs', 'maintenance'],
  },
  {
    title: 'Army Email',
    icon: <AiOutlineMail {...iconProps} />,
    swf: false,
    cac: true,
    href: 'https://webmail.apps.mil/mail',
    description: 'Test 5 description',
  },
  {
    title: 'MyPay',
    icon: <MdAttachMoney {...iconProps} />,
    swf: false,
    cac: false,
    href: 'https://mypay.dfas.mil/#/',
    description: 'Test 6 description',
    tags: ['pay', 'les', 'money'],
  },
  {
    title: 'MedPros',
    icon: <GiHealthNormal {...iconProps} />,
    swf: false,
    cac: true,
    href: 'https://medpros.mods.army.mil/portal',
    description: 'Test 6 description',
    tags: ['medical'],
  },
  {
    title: 'My Clothing Record',
    icon: <GiClothes {...iconProps} />,
    swf: false,
    cac: true,
    href: 'https://ism.army.mil/ism/SelfServiceServlet?nav.nav_id=ssMyClothing',
    description: 'Test 6 description',
    tags: ['clothing'],
  },
  {
    title: 'TRICARE',
    icon: <GiHealthNormal {...iconProps} />,
    swf: false,
    cac: false,
    href: 'https://tricare.mil/',
    description: 'Test 6 description',
    tags: ['medical', 'health', 'dental', 'vision', 'insurance'],
  },
  {
    title: 'Army Career Tracker (ACT)',
    icon: <BsFillBriefcaseFill {...iconProps} />,
    swf: false,
    cac: true,
    href: 'https://actnow.army.mil/',
    description: 'Test 6 description',
    tags: ['sponsorship', 'career'],
  },
  {
    title: 'AIM 2.0',
    icon: <BsFillBriefcaseFill {...iconProps} />,
    swf: false,
    cac: true,
    href: 'https://aim.hrc.army.mil/',
    description: 'Test 6 description',
    tags: ['officer', 'orb'],
  },
  {
    title: 'Cyber Awareness Challenge',
    icon: <GiComputing {...iconProps} />,
    swf: false,
    cac: true,
    href: 'https://cs.signal.army.mil/',
    description: 'Test 6 description',
  },
];

const fuse = new Fuse(exploreData, {
  keys: ['title', 'tags'],
  threshold: 0.3,
});

const Home = () => {
  const [text, setText] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [copiedHref, setCopiedHref] = useState('');
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const results = fuse.search(text);
  const searchFilteredData = text
    ? results.map((result) => result.item)
    : exploreData;
  const favoriteFilteredData = favorite
    ? searchFilteredData.filter((data) => bookmarked.includes(data.title))
    : searchFilteredData;

  useEffect(() => {
    if (localStorage.bookmarked) {
      setBookmarked(JSON.parse(localStorage.bookmarked));
    }
  }, []);

  useEffect(() => {
    localStorage.bookmarked = JSON.stringify(bookmarked);
  }, [bookmarked]);

  const addToBookmarks = (title: string) => {
    if (bookmarked.includes(title)) {
      setBookmarked(bookmarked.filter((item) => item !== title));
    } else {
      setBookmarked([...bookmarked, title]);
    }
  };

  const copyToClipboard = (href: string) => {
    navigator.clipboard.writeText(href).then((r) => {
      setCopiedHref(href);
      setTimeout(() => {
        setCopiedHref('');
      }, 3000);
    });
  };

  return (
    <div className="mx-5vw mt-16">
      <ExploreSearch
        text={text}
        setText={setText}
        favorite={favorite}
        setFavorite={setFavorite}
      />
      <div className="relative grid grid-cols-4 gap-x-10 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-16 mx-auto max-w-7xl">
        {favoriteFilteredData.map((item) => (
          <Link key={item.title} href={item.href} passHref>
            <div className="group col-span-4 mb-16 cursor-pointer">
              <div className="relative w-full h-full grid grid-rows-explore-tabs">
                <a className="focus:outline-none relative">
                  <div
                    className="relative aspect-h-4 aspect-w-3 rounded
                            group-hover:ring dark:group-hover:ring-yellow-400
                            group-hover:ring-zinc-900 ring-offset-zinc-200
                            dark:ring-offset-zinc-900 ring-offset-4 ease-in-out transition duration-300
                            h-full">
                    <div
                      className="block w-full h-full bg-cover bg-center dark:border-none border border-zinc-400 transition duration-300 ease-in-out
                                rounded bg-no-repeat shadow dark:shadow-none bg-zinc-200 dark:bg-zinc-800 flex justify-center items-center">
                      {item.icon ? item.icon : <GiCardRandom {...iconProps} />}
                    </div>
                    {/*{item.swf && (*/}
                    {/*  <div*/}
                    {/*    className="absolute top-2 left-1 w-12 h-12 bg-contain bg-bottom bg-no-repeat bg-[url('/logo/sf-logo-dark.svg')] dark:bg-[url('/logo/sf-logo-light.svg')] transition duration-300 ease-in-out"/>*/}
                    {/*)}*/}

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        addToBookmarks(item.title);
                      }}
                      className="absolute top-4 right-2 opacity-0 group-hover:opacity-100 ease-in-out duration-300 transition-all z-20 ">
                      {bookmarked.includes(item.title) ? (
                        <FaBookmark
                          size={24}
                          className="text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-zinc-700 ease-in-out duration-300 transition-all"
                        />
                      ) : (
                        <FaRegBookmark
                          size={24}
                          className="text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-50 hover:text-zinc-900 ease-in-out duration-300 transition-all"
                        />
                      )}
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.href);
                      }}
                      className={`left-2 absolute bg-zinc-900 dark:bg-zinc-200 text-zinc-50 dark:text-zinc-900 font-semibold z-20 cursor-pointer hover:ring hover:ring-blue-500 rounded py-1.5 px-5 top-3.5 opacity-0 group-hover:opacity-100 ease-in-out duration-300 transition-all`}>
                      {copiedHref.length > 0 && copiedHref === item.href
                        ? 'Copied!'
                        : 'Copy Link'}
                    </div>

                    <h2
                      className="w-full h-full text-base opacity-0 ease-in-out transition-all
                            duration-300 group-hover:opacity-100 font-normal text-zinc-700 dark:text-zinc-300 flex
                            flex-col-reverse p-4 absolute bottom-0 left-0 rounded">
                      {item.description}
                    </h2>
                  </div>
                </a>
                <div
                  className="text-2xl font-semibold md:text-3xl text-black dark:text-white mt-4 row-span-1 transition duration-300 ease-in-out">
                  <h1>{item.title}</h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
