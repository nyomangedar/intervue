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

export default function ChatPanel() {
    const [chatBlobs, setChatBlobs] = useState<JSX.Element[]>([]);
    const [userSession, setUserSession] = useState({
        jobPosting: "",
        userAnswerEstimation: "",
        userEstScore: "",
        userAnswerCompany: "",
        userCompScore: "",
        questionEst: "",
        questionComp: "",
        companyRubric: "",
    });
    const [userFlow, setUserFlow] = useState({
        analyseJobPosting: true,
        caseStudyEst: false,
        caseStudyEstScoring: false,
        caseStudyComp: false,
        caseStudyCompScoring: false,
        feedback: false,
    });

    const setCurrentFlow = (prevCase: string, nextCase: string) => {
        setUserFlow((prevState) => ({
            ...prevState,
            [prevCase]: false,
            [nextCase]: true,
        }));
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserAnswer>();

    const setUserSessionAttr = (data: string, usecase: string) => {
        setUserSession((prevState) => ({
            ...prevState,
            [usecase]: data,
        }));
    };

    const createNewChatBlob = (data: any) => {
        const newChatBlob = <div>{data}</div>;
        setChatBlobs((prevState) => [...prevState, newChatBlob]);
    };
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

            {userFlow.analyseJobPosting && (
                <AnalyseJobPosting
                    register={register}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                    setCurrentFlow={setCurrentFlow}
                    userSessionAttr={userSession}
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
                />
            )}
        </div>
    );
}
