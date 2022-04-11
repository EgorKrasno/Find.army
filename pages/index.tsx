import Fuse from 'fuse.js';
import {useEffect, useState} from 'react';
import ExploreSearch from "../components/ExploreSearch";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates,} from '@dnd-kit/sortable';
import Wrapper from "../components/Wrapper";
import LinkBlock, {Block} from "../components/LinkBlock";
import {AiOutlineMail} from "react-icons/ai";
import {MdAttachMoney} from "react-icons/md";
import {GiClothes, GiComputing, GiHealthNormal} from "react-icons/gi";
import {BsFillBriefcaseFill} from "react-icons/bs";
import {FaPaperclip} from "react-icons/fa";

const exploreData = [
  {
    id: '1',
    title: 'Email 365',
    icon: <AiOutlineMail className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://webmail.apps.mil/mail',
    description: '',
  },
  {
    id: '2',
    title: 'Teams 365',
    icon: <AiOutlineMail className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://dod.teams.microsoft.us',
    description: '',
  },
  {
    id: '3',
    title: 'MyPay',
    icon: <MdAttachMoney className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: false,
    href: 'https://mypay.dfas.mil/#/',
    description: 'Test 6 description',
    tags: ['pay', 'les', 'money'],
  },
  {
    id: '4',
    title: 'MedPros',
    icon: <GiHealthNormal className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://medpros.mods.army.mil/portal',
    description: '',
    tags: ['medical'],
  },
  {
    id: '5',
    title: 'My Clothing Record',
    icon: <GiClothes className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://ism.army.mil/ism/SelfServiceServlet?nav.nav_id=ssMyClothing',
    description: '',
    tags: ['clothing'],
  },
  {
    id: '6',
    title: 'TRICARE',
    icon: <GiHealthNormal className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: false,
    href: 'https://tricare.mil/',
    description: '',
    tags: ['medical', 'health', 'dental', 'vision', 'insurance'],
  },
  {
    id: '7',
    title: 'Army Career Tracker (ACT)',
    icon: <BsFillBriefcaseFill className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://actnow.army.mil/',
    description: '',
    tags: ['sponsorship', 'career'],
  },
  {
    id: '8',
    title: 'AIM 2.0',
    icon: <BsFillBriefcaseFill className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://aim.hrc.army.mil/',
    description: '',
    tags: ['officer', 'orb'],
  },
  {
    id: '9',
    title: 'Cyber Awareness Challenge',
    icon: <GiComputing className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://cs.signal.army.mil/',
    description: '',
  },
  {
    id: '10',
    title: 'DTMS',
    icon: <GiComputing className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://dtms.army.mil/',
    description: '',
  },
  {
    id: '11',
    title: 'iPERMS',
    icon: <FaPaperclip className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://iperms.hrc.army.mil/',
    description: '',
  },
  {
    id: '12',
    title: 'ERB',
    icon: <FaPaperclip className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://myerb.ahrs.army.mil/soldierLogin.do',
    description: 'Soldier Record Brief (Enlisted)',
  },
  {
    id: '13',
    title: 'ORB',
    icon: <FaPaperclip className='dark:fill-yellow-300 fill-zinc-600' size={128}/>,
    cac: true,
    href: 'https://myorb.hrc.army.mil/',
    description: 'Officer Record Brief',
  },
];

const fuse = new Fuse(exploreData, {
  keys: ['title', 'tags'],
  threshold: 0.3,
});

const Home = () => {
    const [text, setText] = useState('');
    const [copiedHref, setCopiedHref] = useState('');
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [activeBlock, setActiveBlock] = useState<any>();

    useEffect(() => {
      if (!localStorage.getItem('blocks')) {
        setBlocks(exploreData)
      } else {
        const order = JSON.parse(localStorage.getItem('blocks')!);

        let oldBlocks = [];
        for (const id of order) {
          const block = exploreData.find(item => item.id === id);
          if (block) oldBlocks.push(block);
        }

        // Detect if explore data has new blocks
        let newBlocks: Block[] = [];
        if (order.length !== exploreData.length) {
          for (const block of exploreData) {
            if (!order.includes(block.id)) {
              newBlocks.push(block);
            }
          }
        }

        setBlocks([...oldBlocks, ...newBlocks]);
      }
    }, []);

    const results = fuse.search(text);
    const searchFilteredData = (text.length > 0)
      ? results.map((result) => result.item)
      : blocks;

    const copyToClipboard = (href: string) => {
      navigator.clipboard.writeText(href).then((r) => {
        setCopiedHref(href);
        setTimeout(() => {
          setCopiedHref('');
        }, 3000);
      });
    };

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const handleDragStart = (event: any) => {
      setActiveBlock(blocks.find(item => item.id === event.active.id)!);
    };

    function handleDragEnd(event: any) {
      const {active, over} = event;

      if (active.id !== over.id) {
        setBlocks((items) => {
          const oldIndex = items.indexOf(items.find(item => item.id === active.id)!);
          const newIndex = items.indexOf(items.find(item => item.id === over.id)!);

          const reorderedItems = arrayMove(items, oldIndex, newIndex);
          const order = reorderedItems.map(item => item.id);
          localStorage.setItem('blocks', JSON.stringify(order));
          return reorderedItems;
        });
      }
    }

    return (
      <div className="mx-12 mt-16">
        <ExploreSearch
          text={text}
          setText={setText}
        />
        <div className="grid grid-cols-4 gap-x-10 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-16 mx-auto max-w-7xl">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext
              items={searchFilteredData}
              strategy={rectSortingStrategy}
            >
              {searchFilteredData.length > 0 ? searchFilteredData.map((item) => (
                  <Wrapper key={item.id}
                           id={item.id}
                           item={item}
                           text={text}
                           copyToClipboard={copyToClipboard}
                           copiedHref={copiedHref}/>
                )) :
                <div className="flex flex-col items-center justify-center w-full col-span-full">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold">
                      No results found
                    </h1>
                  </div>
                </div>
              }
            </SortableContext>
            <DragOverlay>
              {activeBlock ? (
                <LinkBlock
                  isDragging={true}
                  isOverlay={true}
                  item={activeBlock}
                  text={text}
                  copyToClipboard={copyToClipboard}
                  copiedHref={copiedHref}/>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    );
  }
;

export default Home;
