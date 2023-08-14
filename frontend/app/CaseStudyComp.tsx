import { ChatAPIResponse } from "./component/ChatAPIResonpse";
import ChatBlob from "./component/ChatBlob";
import { ChatInitiator } from "./component/ChatInitiator";
import { UserAnswer } from "./component/UserAnswer";
import { UserFlow } from "./component/UserFlow";
import { Button } from "@radix-ui/themes";

const CaseStudyComp: React.FC<ChatInitiator> = ({
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
                <h4>Great!, Here is a company based case study: </h4>
                {data}
            </>
        );
    };
    const chatResponse = async (data: UserAnswer) => {
        const question = await fetch(
            "http://127.0.0.1:8000/chat-api/casestudy-company",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const questionData: ChatAPIResponse = await question.json();
        const rubric = await fetch(
            "http://127.0.0.1:8000/chat-api/rubric-company",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    context: questionData.data.data.content,
                }),
            }
        );
        const rubricData: ChatAPIResponse = await rubric.json();
        setUserSessionAttr(questionData.data.data.content, "questionComp");
        setUserSessionAttr(rubricData.data.data.content, "rubricComp");
        createNewChatBlob(template(questionData.data.data.content));
        setCurrentFlow(UserFlow.caseStudyComp, UserFlow.caseStudyCompScoring);
    };
    return (
        <>
            <h4>
                We have another question for company related use case study! Do
                you wish to continue?
            </h4>
            <div className="flex content-around">
                <Button
                    onClick={() => {
                        chatResponse({
                            message: "",
                            context: userSessionAttr.jobPosting,
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

export default CaseStudyComp;
