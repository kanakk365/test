import { create } from "zustand";
import {
  addServiceQuestions,
  deleteServiceQuestions,
  getAllServiceQuestions,
  QuestionData,
  updateServiceQuestions,
} from "../actions/questions";
import { getSingleServiceData, Service } from "../actions/services";
interface QuestionStore {
  questions: QuestionData[];
  addQuestionData: (data: QuestionData) => void;
  editQuestionData: (id: string, data: QuestionData) => void;
  deleteQuestionData: (id: string) => void;
  service: Service | null;
  getService: (id: string) => void;
  getQuestions: (id: string) => void;
  updateQuestionOrder: (reorderedQuestions: QuestionData[]) => void;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  addQuestionData: async (data) => {
    const newQuestion: QuestionData = {
      question: {
        question_id: "",
        question: data.question?.question || "",
        service_id: get().service?.service_id || "",
        type: data.question?.type || "text",
        multiple: data.question?.multiple || false,
        data_type: data.question?.data_type || "text",
        option_builder_id: "",
      },
      options: {
        option_id: "",
        question_id: data.question?.question_id || "",
        options: data.options?.options || [],
      },
    };

    await addServiceQuestions(newQuestion);

    set((state) => ({
      questions: [...state.questions, newQuestion],
    }));
  },
  editQuestionData: async (id, data) => {
    const updatedQuestion = {
      question: { ...data.question },
      options: { ...data.options },
    };

    await updateServiceQuestions(updatedQuestion);

    set((state) => ({
      questions: state.questions.map((q) =>
        q.question.question_id === id
          ? {
              question: { ...q.question, ...data.question },
              options: { ...q.options, ...data.options },
            }
          : q,
      ),
    }));
  },
  deleteQuestionData: async (id) => {
    await deleteServiceQuestions(id);
    set((state) => ({
      questions: state.questions.filter((q) => q.question.question_id !== id),
    }));
  },
  service: null,
  getService: async (id) => {
    const r = await getSingleServiceData(id);
    if (r) {
      set({ service: r });
    }
  },
  getQuestions: async (id) => {
    const r = await getAllServiceQuestions(id);
    if (r) {
      set({ questions: r });
    }
  },
  updateQuestionOrder: (reorderedQuestions: QuestionData[]) => {
    const totalQuestions = reorderedQuestions.length;
    const updatedQuestions = reorderedQuestions.map((question, index) => {
      const [type] = question.question.type.split("_");
      // Reverse the priority: items at the top get higher numbers
      const priority = totalQuestions - index;
      const updatedQuestion = {
        ...question,
        question: {
          ...question.question,
          type: `${type}_${priority}`,
        },
      };
      updateServiceQuestions(updatedQuestion);
      return updatedQuestion;
    });

    set({ questions: updatedQuestions });
  },
}));

export type LogicType = {
  type: string;
  field: string;
  value: string;
  valueSource: "token" | "constant" | "previous-question";
};

export type LogicBuilder = {
  id: string;
  name: string;
  logic: LogicType[];
  sourceTable: string;
  sourceColumn: string;
  optionColumn: string;
  optionIdColumn: string;
  questionId: string;
};

export interface LogicBuilderStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  selectedQuestion: string | null;
  setSelectedQuestion: (id: string | null) => void;
  logicBuilders: LogicBuilder[];
  addLogicBuilder: (builder: LogicBuilder) => void;
}

export const useLogicBuilderStore = create<LogicBuilderStore>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
  selectedQuestion: null,
  setSelectedQuestion: (id) => set({ selectedQuestion: id }),
  logicBuilders: [],
  addLogicBuilder: (builder) =>
    set((state) => ({
      logicBuilders: [...state.logicBuilders, builder],
    })),
}));
