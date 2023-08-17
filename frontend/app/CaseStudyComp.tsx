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
const CaseStudyComp: React.FC<ChatInitiator> = ({
    register,
    handleSubmit,
    createNewChatBlob,
    setUserSessionAttr,
    setCurrentFlow,
    userSessionAttr,
    loadingHandle,
}) => {
    const template = (data: any) => {
        return "<p>Great!, Here is a company based case study:\n</p>" + data;
    };
    const chatResponse = async (data: UserAnswer) => {
        const questionData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.caseStudyComp,
            data,
            loadingHandle
        );
        const questionAnswer = {
            message: "",
            context: questionData.data.data.content,
        };
        const rubricData: ChatAPIResponse = await ChatFetcher(
            ChatAPIList.rubricComp,
            questionAnswer,
            loadingHandle
        );
        setUserSessionAttr(questionData.data.data.content, "questionComp");
        setUserSessionAttr(rubricData.data.data.content, "companyRubric");
        createNewChatBlob(ChatBlobAI(template(questionData.data.data.content)));
        setCurrentFlow(UserFlow.caseStudyComp, UserFlow.userDiscussionComp);
    };
    return (
        <>
            <p>
                We have another question for company related use case study! Do
                you wish to continue?
            </p>
            <div>
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
