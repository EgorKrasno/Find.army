import { LinkCard, LinkCardProps } from './link-card';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function DraggableLinkCard(props: LinkCardProps) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.cardData.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="h-full w-full"
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}>
      <LinkCard ref={setNodeRef} {...props} isDragging={isDragging} />
    </div>
  );
}
