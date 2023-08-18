import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import ChatBlobAI from "./component/ChatBlobAI";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { Button } from "@radix-ui/themes";
import {
    ChatFetcher,
    ChatAPIList,
    ChatSessionList,
} from "./component/ChatFetch";
import { useEffect, useState } from "react";
const QuestionPromptEst: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    userSessionAttr,
    loadingHandle,
    setValue,
}) => {
    const [questionState, setQuestionState] = useState(false);
    const enableQuestion = () => {
        setQuestionState(!questionState);
        createNewChatBlob(ChatBlobAI("Please ask me any question"));
    };
    const continueFlow = () => {
        setCurrentFlow(
            UserFlow.userDiscussionEst,
            UserFlow.caseStudyEstScoring
        );
    };
    const chatResponse = async (data: UserAnswer) => {
        const questionAnswerData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.question,
            data,
            loadingHandle
        );
        setUserSessionAttr(
            userSessionAttr.userDiscussionEst +
                " user said: " +
                data.message +
                " your answer: " +
                questionAnswerData.data.data.content,
            "userDiscussionEst"
        );
        setValue("message", "");
        console.log(userSessionAttr.userDiscussionEst);
        createNewChatBlob(ChatBlobAI(questionAnswerData.data.data.content));
        setQuestionState(!questionState);
    };
    return (
        <>
            {questionState ? (
                <>
                    <ChatBlob
                        apiPost={chatResponse}
                        register={register}
                        handleSubmit={handleSubmit}
                        createNewChatBlob={createNewChatBlob}
                        prevContext={
                            "question: " +
                            userSessionAttr.questionEst +
                            " discussion: " +
                            userSessionAttr.userDiscussionEst
                        }
                    />
                </>
            ) : (
                <div style={{ padding: "8px 8px 8px 8px" }}>
                    <p>Do you have any question related to the study case?</p>
                    <div>
                        <Button
                            onClick={() => {
                                enableQuestion();
                            }}
                        >
                            <h2>Yes</h2>
                        </Button>{" "}
                        <Button onClick={() => continueFlow()}>
                            <h2>No</h2>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuestionPromptEst;
