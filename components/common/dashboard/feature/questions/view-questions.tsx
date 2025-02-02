"use client";
import { useEffect, useState } from "react";
import { useQuestionStore } from "@/app/hooks/questions";
import AddQuestionDialog from "./add-question-dialog-box";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableQuestion } from "./sortable-question";
import LogicBuilderDialog from "./questions-logic";

export const DATA_TYPES = ["text", "number", "date", "email", "tel"];
export const QTYPES = ["static", "dynamic"];

export type QuestionFormData = {
  question: string;
  data_type: string;
  multiple: boolean;
  priority: number;
  type: string;
  options: string[];
};

export default function QuestionsViewPage({
  service_id,
}: {
  service_id: string;
}) {
  const { questions, service, getService, getQuestions, updateQuestionOrder } =
    useQuestionStore();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set(),
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    getService(service_id);
    getQuestions(service_id);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex(
        (q) => q.question.question_id === active.id,
      );
      const newIndex = questions.findIndex(
        (q) => q.question.question_id === over.id,
      );

      const reorderedQuestions = arrayMove(questions, oldIndex, newIndex);
      updateQuestionOrder(reorderedQuestions);
    }
  };

  return (
    <div className="container mx-auto p-6 text-black bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Manage questions for {service?.service_name}
        </h1>
        <AddQuestionDialog />
        <LogicBuilderDialog />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map((q) => q.question.question_id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4">
            {questions.map((questionData, index) => (
              <SortableQuestion
                key={questionData.question.question_id}
                questionData={questionData}
                index={index}
                isExpanded={expandedQuestions.has(
                  questionData.question.question_id,
                )}
                onToggle={() =>
                  toggleQuestion(questionData.question.question_id)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
