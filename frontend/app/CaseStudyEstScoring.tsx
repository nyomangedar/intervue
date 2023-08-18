import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { useEffect } from "react";
import ChatBlobAI from "./component/ChatBlobAI";
import { ChatFetcher, ChatAPIList } from "./component/ChatFetch";

const CaseStudyEstScoring: React.FC<ChatInitiator> = ({
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
        setUserSessionAttr(data.message, "userAnswerEstimation");
        const resData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.scoringEst,
            data,
            loadingHandle
        );
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
                prevContext={
                    userSessionAttr.questionEst +
                    userSessionAttr.userDiscussionEst
                }
            />
        </>
    );
};

export default CaseStudyEstScoring;
