import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import LinkBlock from "./LinkBlock";

const Wrapper = (props:any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className="group col-span-4 mb-16 cursor-pointer"
      ref={setNodeRef}
      style={style}
    >
      <LinkBlock
        isDragging={isDragging}
        isOverlay={false}
        attributes={attributes}
        listeners={listeners}
        copyToClipboard={props.copyToClipboard}
        copiedHref={props.copiedHref}
        text={props.text}
        item={props.item}/>
    </div>
  );
}

export default Wrapper;