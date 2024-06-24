import { LinkCard } from './link-card';

import { LinkCardData } from '@/data/cards';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function DraggableLinkCard({
  cardData,
  isFiltering,
}: {
  cardData: LinkCardData;
  isFiltering?: boolean;
  disableBackground?: boolean;
}) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: cardData.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="h-full w-full"
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}>
      <LinkCard
        cardData={cardData}
        isFiltering={isFiltering}
        isDragging={isDragging}
      />
    </div>
  );
}
