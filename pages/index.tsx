import Fuse from 'fuse.js';
import {useState} from 'react';
import ExploreSearch from "../components/ExploreSearch";
import {exploreData} from "../data/exporeData";
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
import LinkBlock from "../components/LinkBlock";

const fuse = new Fuse(exploreData, {
  keys: ['title', 'tags'],
  threshold: 0.3,
});

const Home = () => {
  const [text, setText] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [copiedHref, setCopiedHref] = useState('');
  const [blocks, setBlocks] = useState<any[]>(exploreData);
  const [activeBlock, setActiveBlock] = useState<any>();

  const results = fuse.search(text);
  const searchFilteredData = text.length > 0
    ? results.map((result) => result.item)
    : blocks;

  // const favoriteFilteredData = favorite
  //   ? searchFilteredData.filter((data) => bookmarked.includes(data.title))
  //   : searchFilteredData;

  // useEffect(() => {
  //   if (localStorage.bookmarked) {
  //     setBookmarked(JSON.parse(localStorage.bookmarked));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.bookmarked = JSON.stringify(bookmarked);
  // }, [bookmarked]);

  // const addToBookmarks = (title: string) => {
  //   if (bookmarked.includes(title)) {
  //     setBookmarked(bookmarked.filter((item) => item !== title));
  //   } else {
  //     setBookmarked([...bookmarked, title]);
  //   }
  // };

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

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="mx-12 mt-16">
      <ExploreSearch
        text={text}
        setText={setText}
        favorite={favorite}
        setFavorite={setFavorite}
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
            {searchFilteredData.map((item) => (
              <Wrapper key={item.id}
                       id={item.id}
                       item={item}
                       text={text}
                       copyToClipboard={copyToClipboard}
                       copiedHref={copiedHref}/>
            ))}
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
};

export default Home;
