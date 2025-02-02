import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";
import { QuestionData } from "@/app/actions/questions";
import { useQuestionStore } from "@/app/hooks/questions";
import { DATA_TYPES, QTYPES, QuestionFormData } from "./view-questions";

export default function EditQuestionDialog({
  questionData,
}: {
  questionData: QuestionData;
}) {
  const { editQuestionData, questions } = useQuestionStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<QuestionFormData>({
    question: questionData.question.question,
    data_type: questionData.question.data_type,
    multiple: questionData.question.multiple,
    options: questionData.options.options,
    priority: 0,
    type: questionData.question.type,
  });
  const [newOption, setNewOption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeCount = questions.filter(
      (q) => q.question.type === formData.type,
    ).length;
    const priority = `${formData.type}_${typeCount + 1}`;
    editQuestionData(questionData.question.question_id, {
      question: {
        question: formData.question,
        data_type: formData.data_type,
        multiple: formData.multiple,
        service_id: uuidv4(),
        type: priority,
        // priority: priority,
        option_builder_id: uuidv4(),
        question_id: uuidv4(),
      },
      options: {
        options: formData.options,
        option_id: uuidv4(),
        question_id: uuidv4(),
      },
    });
    setOpen(false);
  };

  const addOption = () => {
    if (newOption.trim()) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, newOption.trim()],
      }));
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={formData.question}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, question: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Data Type</Label>
            <Select
              value={formData.data_type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, data_type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {DATA_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Question Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {QTYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="multiple"
              checked={formData.multiple}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, multiple: checked }))
              }
            />
            <Label htmlFor="multiple">Allow multiple selections</Label>
          </div>
          <div className="grid gap-2">
            <Label>Options</Label>
            <div className="flex gap-2">
              <Input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add an option"
              />
              <Button type="button" onClick={addOption}>
                Add
              </Button>
            </div>
            <div className="grid gap-2">
              {formData.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-secondary p-2 rounded"
                >
                  <span>{option}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
