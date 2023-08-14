import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { UserAnswer } from "./UserAnswer";

export type ChatInitiator = {
    register: UseFormRegister<UserAnswer>;
    handleSubmit: UseFormHandleSubmit<UserAnswer>;
    createNewChatBlob: (data: string) => void;
    setUserSessionAttr: (data: string, usecase: string) => void;
};
