"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";

export interface Question {
  question_id: string;
  question: string;
  service_id: string;
  type: string;
  multiple: boolean;
  data_type: string;
  option_builder_id: string;
}

export interface Options {
  option_id: string;
  question_id: string;
  options: string[];
}

export interface QuestionData {
  question: Question;
  options: Options;
}

export const getAllServiceQuestions = async (service: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/admin/questions/service/${service}`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as QuestionData[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addServiceQuestions = async (question: QuestionData) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/admin/questions/create`,
      question,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as QuestionData;
  } catch {
    return null;
  }
};

export const updateServiceQuestions = async (question: QuestionData) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/admin/questions/update`,
      question,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as QuestionData;
  } catch {
    return null;
  }
};

export const deleteServiceQuestions = async (question_id: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.delete(
      `${config.api}/${config.api_v}/admin/questions/${question_id}`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.success as boolean;
  } catch {
    return null;
  }
};

export const getAllDatabaseTableNames = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/admin/db/tables`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as string[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllDatabaseTableColumnNames = async (table: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/admin/db/table/${table}`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    console.log(res.data);
    return res.data.data as string[];
  } catch (error) {
    console.log(error);
    return null;
  }
};
