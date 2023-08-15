import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import ChatBlobAI from "./component/ChatBlobAI";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { Button } from "@radix-ui/themes";

const CaseStudyEst: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    userSessionAttr,
}) => {
    const template = (data: any) => {
        return (
            <>
                <p>Great! Here is an estimation case study: </p>
                {data}
            </>
        );
    };
    const chatResponse = async (data: UserAnswer) => {
        const response = await fetch(
            "http://127.0.0.1:8000/chat-api/casestudy-estimation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const resData: ChatAPIResponse = await response.json();
        createNewChatBlob(ChatBlobAI(template(resData.data.data.content)));
        setUserSessionAttr("questionEst", resData.data.data.content);
        setCurrentFlow(UserFlow.caseStudyEst, UserFlow.caseStudyEstScoring);
    };
    return (
        <div style={{ padding: "8px 8px 8px 8px" }}>
            <h4>Do you wish to continue for the example question?</h4>
            <div>
                <Button
                    onClick={() => {
                        chatResponse({
                            message: "",
                            context: "",
                        });
                    }}
                >
                    <h2>Yes</h2>
                </Button>{" "}
                <Button>
                    <h2>No</h2>
                </Button>
            </div>
        </div>
    );
};

export default CaseStudyEst;
