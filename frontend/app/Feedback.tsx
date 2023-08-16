import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import ChatBlobAI from "./component/ChatBlobAI";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { Button } from "@radix-ui/themes";
import { ChatFetcher, ChatAPIList } from "./component/ChatFetch";

const Feedback: React.FC<ChatInitiator> = ({
    createNewChatBlob,
    setCurrentFlow,
    userSessionAttr,
    loadingHandle,
}) => {
    const chatResponse = async (data: UserAnswer) => {
        const resData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.caseStudyEst,
            data,
            loadingHandle
        );

        createNewChatBlob(ChatBlobAI(userSessionAttr.userEstScore));
        createNewChatBlob(ChatBlobAI(userSessionAttr.userCompScore));
        createNewChatBlob(ChatBlobAI(resData.data.data.content));
        setCurrentFlow(UserFlow.feedback, UserFlow.analyseJobPosting);
    };
    return (
        <>
            <h4>Do you want to see the final result of your answer?</h4>
            <div className="flex content-around">
                <Button
                    onClick={() => {
                        chatResponse({
                            message: "",
                            context:
                                userSessionAttr.userCompScore +
                                userSessionAttr.userEstScore,
                        });
                    }}
                >
                    <h2>Yes</h2>
                </Button>{" "}
                <Button>
                    <h2>No</h2>
                </Button>
            </div>
        </>
    );
};

export default Feedback;
