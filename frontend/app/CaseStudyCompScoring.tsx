import { useEffect } from "react";
import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import ChatBlobAI from "./component/ChatBlobAI";

const CaseStudyCompScoring: React.FC<ChatInitiator> = ({
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
        setUserSessionAttr(data.message, "userAnswerCompany");
        const response = await fetch(
            "http://127.0.0.1:8000/chat-api/scoring-company",
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
            "userCompScore"
        );
        setCurrentFlow(UserFlow.caseStudyCompScoring, UserFlow.feedback);
    };
    return (
        <>
            <ChatBlob
                apiPost={chatResponse}
                register={register}
                handleSubmit={handleSubmit}
                createNewChatBlob={createNewChatBlob}
                prevContext={
                    userSessionAttr.questionComp + userSessionAttr.companyRubric
                }
            />
        </>
    );
};

export default CaseStudyCompScoring;
