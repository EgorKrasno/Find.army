import Fuse from 'fuse.js';
import {useEffect, useState} from 'react';
import ExploreSearch from "../components/ExploreSearch";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates,} from '@dnd-kit/sortable';
import Wrapper from "../components/Wrapper";
import LinkBlock, {Item} from "../components/LinkBlock";
import FeedbackButton from "../components/FeedbackButton";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeedbackModal from "../components/FeedbackModal";
import {cards} from "../data/cards";

const fuse = new Fuse(cards, {
  keys: ['title', 'tags', 'description'],
  threshold: 0.3,
});

const Home = () => {
    const [text, setText] = useState('');
    const [blocks, setBlocks] = useState<Item[]>([]);
    const [activeBlock, setActiveBlock] = useState<any>();
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const openModal = () => setIsFeedbackModalOpen(true);

    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    useEffect(() => {
      if (!localStorage.getItem('blocks')) {
        setBlocks(cards)
      } else {
        const order = JSON.parse(localStorage.getItem('blocks')!);

        let oldBlocks = [];
        for (const id of order) {
          const block = cards.find(item => item.id === id);
          if (block) oldBlocks.push(block);
        }

        // Detect if explore data has new blocks
        let newBlocks: Item[] = [];
        if (order.length !== cards.length) {
          for (const block of cards) {
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

    const handleDragStart = (event: any) => {
      setActiveBlock(blocks.find(item => item.id === event.active.id)!);
    };

    const handleDragEnd = (event: any) => {
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
      <div
        className="relative flex flex-col dark:background-dark background-light min-h-screen antialiased font-purista transition ease-in-out overflow-hidden">
        <Nav openModal={openModal}/>
        <div className="flex-1 mx-6 sm:mx-12">
          <ExploreSearch
            text={text}
            setText={setText}
          />
          <div className="grid mt-12 grid-cols-4 gap-x-10 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-16 mx-auto max-w-7xl">
            {blocks.length > 0 && <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
            >
                <SortableContext
                    items={blocks}
                    strategy={rectSortingStrategy}
                >
                  {searchFilteredData.length > 0 ? searchFilteredData.map((item) => (
                      <Wrapper key={item.id}
                               id={item.id}
                               item={item}
                               text={text}/>
                    )) :
                    <div className="flex flex-col items-center justify-center w-full col-span-full">
                      <div className="flex flex-col text-center items-center justify-center space-y-12">
                        <h1 className="text-6xl font-bold">
                          No results found
                        </h1>
                        <div className="relative">
                          <div className="absolute -inset-1 blur dark:bg-yellow-400 bg-sky-700"/>
                          <FeedbackButton text='Make a suggestion' style="relative w-64 py-2 text-2xl"
                                          openModal={openModal}/>
                        </div>
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
                      text={text}/>
                  ) : null}
                </DragOverlay>
            </DndContext>}
          </div>
          <Footer/>
        </div>
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          closeModal={() => setIsFeedbackModalOpen(false)}/>
      </div>
    );
  }
;

export default Home;
