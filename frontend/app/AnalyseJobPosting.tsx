import { useState } from "react";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import { UserAnswer } from "./component/UserAnswer";

const AnalyseJobPosting: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
}) => {
    const [response, setRes] = useState(false);
    const chatResponse = async (data: UserAnswer) => {
        setRes(true);
        setUserSessionAttr(data.message, "jobPosting");
        const response = await fetch(
            "http://127.0.0.1:8000/chat-api/analyze-job-posting",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const resData: ChatAPIResponse = await response.json();
        createNewChatBlob(resData.data.data.content);
    };

    return (
        <>
            {response ? null : (
                <ChatBlob
                    apiPost={chatResponse}
                    register={register}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    prevContext=""
                />
            )}
        </>
    );
};

export default AnalyseJobPosting;
