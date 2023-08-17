import { useEffect } from "react";
import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import ChatBlobAI from "./component/ChatBlobAI";
import { ChatFetcher, ChatAPIList } from "./component/ChatFetch";

const CaseStudyCompScoring: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    setValue,
    userSessionAttr,
    loadingHandle,
}) => {
    useEffect(() => {
        createNewChatBlob(
            ChatBlobAI("<p>Please provide answer for the question above</p>")
        );
    }, []);
    const chatResponse = async (data: UserAnswer) => {
        setUserSessionAttr(data.message, "userAnswerCompany");
        const resData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.scoringComp,
            data,
            loadingHandle
        );
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
                    userSessionAttr.questionComp +
                    userSessionAttr.companyRubric +
                    userSessionAttr.userDiscussionComp
                }
            />
        </>
    );
};

export default CaseStudyCompScoring;
