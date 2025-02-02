import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash2,
} from "lucide-react";
import EditQuestionDialog from "./edit-question-dialog-box";
import { QuestionData } from "@/app/actions/questions";
import { useLogicBuilderStore, useQuestionStore } from "@/app/hooks/questions";

interface SortableQuestionProps {
  questionData: QuestionData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function SortableQuestion({
  questionData,
  index,
  isExpanded,
  onToggle,
}: SortableQuestionProps) {
  const { deleteQuestionData } = useQuestionStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: questionData.question.question_id });
  const { setOpen } = useLogicBuilderStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div {...attributes} {...listeners}>
              <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
            </div>
            <CardTitle className="text-lg">
              {index + 1}. {questionData.question.question}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <EditQuestionDialog questionData={questionData} />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteQuestionData(questionData.question.question_id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <BrainCircuit className="h-4 w-4" />
            </Button>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label>Type</Label>
              <div className="text-sm text-muted-foreground">
                {questionData.question.data_type}
              </div>
            </div>
            <div>
              <Label>Multiple Selection</Label>
              <div className="text-sm text-muted-foreground">
                {questionData.question.multiple ? "Yes" : "No"}
              </div>
            </div>
            {questionData.options.options.length > 0 && (
              <div>
                <Label>Options</Label>
                <div className="grid gap-2">
                  {questionData.options.options.map((option, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
