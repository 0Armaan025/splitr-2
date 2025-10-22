'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Poppins } from 'next/font/google';
import StatCard from './statcard';

const poppinsFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

type UnitType = 'lak' | 'tho' | 'cro' | 'hun';

interface StatCardProps {
  id: string;
  title: string;
  statNow: number;
  isPercent?: boolean;
  unitType?: UnitType;
}

const initialStats: StatCardProps[] = [
  { id: '1', title: 'Revenue', statNow: 12.5, unitType: 'lak' },
  { id: '2', title: 'Engagement Rate', statNow: 64.2, isPercent: true },
  { id: '3', title: 'New Users', statNow: 23.7, unitType: 'tho' },
  { id: '4', title: 'Active Campaigns', statNow: 3.2, unitType: 'hun' },
];

const StatBoard = () => {
  const [stats, setStats] = useState(initialStats);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(stats);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setStats(items);
  };

  return (
    <div className={`${poppinsFont.className} px-4 sm:px-8 lg:px-16 py-10`}>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Your Stats Overview</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stats" direction="horizontal" isDropDisabled={false} isCombineEnabled={true} ignoreContainerClipping={false}>
          {(provided) => (
            <div
              className="flex flex-wrap gap-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stats.map((stat, index) => (
                <Draggable key={stat.id} draggableId={stat.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-transform ${
                        snapshot.isDragging ? 'scale-105 rotate-1' : ''
                      }`}
                    >
                      <StatCard {...stat} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default StatBoard;
