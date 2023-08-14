import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";

const CaseStudyEstScoring: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    userSessionAttr,
}) => {
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
        setUserSessionAttr(resData.data.data.content, "userEstScore");
        createNewChatBlob(resData.data.data.content);
        setCurrentFlow(UserFlow.caseStudyEstScoring, UserFlow.caseStudyComp);
    };
    return (
        <>
            <h2>Please provide answer for the question above</h2>
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
