import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { Button } from "@radix-ui/themes";

const Feedback: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    userSessionAttr,
}) => {
    const chatResponse = async (data: UserAnswer) => {
        const response = await fetch(
            "http://127.0.0.1:8000/chat-api/feedback",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const resData: ChatAPIResponse = await response.json();
        createNewChatBlob(userSessionAttr.userEstScore);
        createNewChatBlob(userSessionAttr.userCompScore);
        createNewChatBlob(resData.data.data.content);
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
