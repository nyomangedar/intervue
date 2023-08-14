"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextArea, Button } from "@radix-ui/themes";
import { useState } from "react";
import { data } from "autoprefixer";
import { UserAnswer } from "./component/UserAnswer";
import AnalyseJobPosting from "./AnalyseJobPosting";
import CaseStudyEst from "./CaseStudyEst";
import CaseStudyEstScoring from "./CaseStudyEstScoring";
import CaseStudyComp from "./CaseStudyComp";
import CaseStudyCompScoring from "./CaseStudyCompScoring";
import Feedback from "./Feedback";

export default function Home() {
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
        console.log(newChatBlob);
    };
    return (
        <div className="flex flex-col items-center">
            <div
                className="flex flex-col items-center gap-4"
                style={{ width: 900 }}
            >
                <h1>Intervue</h1>
                <h1>Start your interview journey here!</h1>
                <p>To start please insert your job description!</p>
                {chatBlobs}
                {userFlow.analyseJobPosting && (
                    <AnalyseJobPosting
                        register={register}
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
                        handleSubmit={handleSubmit}
                        createNewChatBlob={createNewChatBlob}
                        setUserSessionAttr={setUserSessionAttr}
                        setCurrentFlow={setCurrentFlow}
                        userSessionAttr={userSession}
                    />
                )}
            </div>
        </div>
    );
}
