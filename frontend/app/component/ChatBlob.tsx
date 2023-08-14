import { Button, TextArea } from "@radix-ui/themes";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import { UserAnswer } from "./UserAnswer";

type ChatBlobAttr = {
    apiPost: (data: UserAnswer) => Promise<void>;
    register: UseFormRegister<UserAnswer>;
    handleSubmit: UseFormHandleSubmit<UserAnswer>;
    createNewChatBlob: (data: string) => void;
    prevContext: string;
};

const ChatBlob: React.FC<ChatBlobAttr> = ({
    apiPost,
    register,
    handleSubmit,
    createNewChatBlob,
    prevContext,
}) => {
    return (
        <form
            className="flex gap-2 items-end"
            onSubmit={handleSubmit(async (data: UserAnswer) => {
                console.log(data);
                createNewChatBlob(data.message);
                apiPost(data);
            })}
            style={{ width: 400 }}
        >
            <TextArea
                {...register("message")}
                size="1"
                style={{ maxWidth: 400, height: 200 }}
            />{" "}
            <Button type="submit" style={{ height: 48 }}>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 11L6 4L10.5 7.5L6 11Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </Button>
        </form>
    );
};
export default ChatBlob;
