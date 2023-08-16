import {
    UseFormRegister,
    UseFormHandleSubmit,
    UseFormSetValue,
} from "react-hook-form";
import { UserAnswer } from "./UserAnswer";

export type ChatInitiator = {
    register: UseFormRegister<UserAnswer>;
    handleSubmit: UseFormHandleSubmit<UserAnswer>;
    setValue: UseFormSetValue<UserAnswer>;
    createNewChatBlob: (data: any) => void;
    setUserSessionAttr: (data: string, usecase: string) => void;
    userSessionAttr: {
        jobPosting: string;
        userAnswerEstimation: string;
        userEstScore: string;
        userAnswerCompany: string;
        userCompScore: string;
        questionEst: string;
        questionComp: string;
        companyRubric: string;
    };
    setCurrentFlow: (prevCase: string, nextCase: string) => void;
    loadingHandle: (state: boolean) => void;
};
