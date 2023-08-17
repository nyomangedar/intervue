import { Button, TextArea } from "@radix-ui/themes";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import { UserAnswer } from "./UserAnswer";
import ChatBlobUser from "./ChatBlobUser";

type ChatBlobAttr = {
    apiPost: (data: UserAnswer) => Promise<void>;
    register: UseFormRegister<UserAnswer>;
    handleSubmit: UseFormHandleSubmit<UserAnswer>;
    createNewChatBlob: (data: any) => void;
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
            className="flex gap-2"
            onSubmit={handleSubmit(async (data: UserAnswer) => {
                createNewChatBlob(ChatBlobUser(data.message));
                const reqBody = {
                    message: data.message,
                    context: prevContext,
                };
                await apiPost(reqBody);
            })}
            style={{ padding: "24px 8px 24px 8px" }}
        >
            <TextArea
                {...register("message")}
                size="1"
                style={{ width: 200 }}
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
