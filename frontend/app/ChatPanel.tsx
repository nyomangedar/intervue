"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Text, Button, Avatar } from "@radix-ui/themes";
import { useState } from "react";
import { data } from "autoprefixer";
import { UserAnswer } from "./component/UserAnswer";
import AnalyseJobPosting from "./AnalyseJobPosting";
import CaseStudyEst from "./CaseStudyEst";
import CaseStudyEstScoring from "./CaseStudyEstScoring";
import CaseStudyComp from "./CaseStudyComp";
import CaseStudyCompScoring from "./CaseStudyCompScoring";
import Feedback from "./Feedback";
import QuestionPromptEst from "./QuestionPromptEst";
import QuestionPromptComp from "./QuestionPromptComp";
import EndConversation from "./EndConversation";

export default function ChatPanel() {
    const [chatBlobs, setChatBlobs] = useState<JSX.Element[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userSession, setUserSession] = useState({
        jobPosting: "",
        userAnswerEstimation: "",
        userEstScore: "",
        userAnswerCompany: "",
        userCompScore: "",
        questionEst: "",
        questionComp: "",
        companyRubric: "",
        userDiscussionEst: "",
        userDiscussionComp: "",
    });
    const [userFlow, setUserFlow] = useState({
        analyseJobPosting: true,
        caseStudyEst: false,
        caseStudyEstScoring: false,
        caseStudyComp: false,
        caseStudyCompScoring: false,
        feedback: false,
        discussion: false,
        userDiscussionEst: false,
        userDiscussionComp: false,
        endConversation: false,
    });

    const setCurrentFlow = (
        prevCase: string,
        nextCase: string | null = null
    ) => {
        if (nextCase) {
            setUserFlow((prevState) => ({
                ...prevState,
                [prevCase]: false,
                [nextCase]: true,
            }));
        } else {
            setUserFlow((prevState) => ({
                ...prevState,
                [prevCase]: false,
            }));
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserAnswer>();

    const setUserSessionAttr = (
        data: string,
        usecase: keyof typeof userSession
    ) => {
        setUserSession((prevState) => ({
            ...prevState,
            [usecase]: data,
        }));
        // console.log(userSession);
    };

    const createNewChatBlob = (data: any) => {
        const newChatBlob = <div>{data}</div>;
        setChatBlobs((prevState) => [...prevState, newChatBlob]);
    };

    const setLoading = (state: boolean) => {
        setIsLoading(state);
    };

    const chatInputMessage = (
        <>
            {userFlow.analyseJobPosting && (
                <AnalyseJobPosting
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.caseStudyEst && (
                <CaseStudyEst
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.caseStudyEstScoring && (
                <CaseStudyEstScoring
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.caseStudyComp && (
                <CaseStudyComp
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.caseStudyCompScoring && (
                <CaseStudyCompScoring
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.feedback && (
                <Feedback
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.userDiscussionEst && (
                <QuestionPromptEst
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.userDiscussionComp && (
                <QuestionPromptComp
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
            {userFlow.endConversation && (
                <EndConversation
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
                    loadingHandle={setLoading}
                />
            )}
        </>
    );
    return (
        <div className="flex flex-col border-r" style={{ width: 640 }}>
            {/* Chat Header */}
            <div
                className="flex gap-2 items-center border-b"
                style={{ padding: "24px 24px 16px 24px" }}
            >
                <Avatar fallback="Z" />
                <Text>Zoey</Text>
            </div>
            <div
                className="flex flex-col gap-4 overflow-auto"
                style={{ height: 500, padding: 24 }}
            >
                {chatBlobs}
            </div>

            {isLoading ? (
                <div
                    className="flex items-center"
                    style={{ height: 96, padding: "0px 24px 0px 24px" }}
                >
                    <Text size="3" color="gray">
                        Retrieving Chat...
                    </Text>
                </div>
            ) : (
                chatInputMessage
            )}
        </div>
    );
}
