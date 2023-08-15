import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { useEffect } from "react";
import ChatBlobAI from "./component/ChatBlobAI";

const CaseStudyEstScoring: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    setValue,
    userSessionAttr,
}) => {
    useEffect(() => {
        createNewChatBlob(
            ChatBlobAI(<p>Please provide answer for the question above</p>)
        );
    }, []);
    const chatResponse = async (data: UserAnswer) => {
        setUserSessionAttr(data.message, "userAnswerEstimation");
        const response = await fetch(
            "http://127.0.0.1:8000/chat-api/scoring-estimation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const resData: ChatAPIResponse = await response.json();
        setValue("message", "");
        setUserSessionAttr(
            "Here is our feedback regarding your answer for company based study case" +
                resData.data.data.content,
            "userEstScore"
        );
        setCurrentFlow(UserFlow.caseStudyEstScoring, UserFlow.caseStudyComp);
    };
    return (
        <>
            <ChatBlob
                apiPost={chatResponse}
                register={register}
                handleSubmit={handleSubmit}
                createNewChatBlob={createNewChatBlob}
                prevContext={userSessionAttr.questionEst}
            />
        </>
    );
};

export default CaseStudyEstScoring;
