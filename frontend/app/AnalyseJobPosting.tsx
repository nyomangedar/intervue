import { useEffect, useState } from "react";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import { UserAnswer } from "./component/UserAnswer";
import { Button } from "@radix-ui/themes";
import { UserFlow } from "./component/UserFlow";
import ChatBlobAI from "./component/ChatBlobAI";
import { ChatFetcher, ChatAPIList } from "./component/ChatFetch";

const AnalyseJobPosting: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    setValue,
    loadingHandle,
}) => {
    const newChat = (
        <p>Hi there! Please enter your job description you want to apply</p>
    );
    const resChat = <p>Here is the summary of your job description!</p>;
    useEffect(() => {
        createNewChatBlob(ChatBlobAI(newChat));
    }, []);
    const chatResponse = async (data: UserAnswer) => {
        setUserSessionAttr(data.message, "jobPosting");
        const resData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.analyseJob,
            data,
            loadingHandle
        );
        createNewChatBlob(ChatBlobAI(resChat));
        createNewChatBlob(ChatBlobAI(resData.data.data.content));
        setValue("message", "");
        setCurrentFlow(UserFlow.analyseJobPosting, UserFlow.caseStudyEst);
    };

    return (
        <>
            <ChatBlob
                apiPost={chatResponse}
                register={register}
                handleSubmit={handleSubmit}
                createNewChatBlob={createNewChatBlob}
                prevContext=""
            />
        </>
    );
};

export default AnalyseJobPosting;
