import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
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
                <h4>Great!, Here is an estimation case study: </h4>
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
        createNewChatBlob(template(resData.data.data.content));
        setUserSessionAttr("questionEst", resData.data.data.content);
        setCurrentFlow(UserFlow.caseStudyEst, UserFlow.caseStudyEstScoring);
    };
    return (
        <>
            <h4>Do you wish to continue for the example question?</h4>
            <div className="flex content-around">
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
        </>
    );
};

export default CaseStudyEst;
