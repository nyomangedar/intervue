"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextArea, Button } from "@radix-ui/themes";
import { useState } from "react";
import { data } from "autoprefixer";
import { UserAnswer } from "./component/UserAnswer";
import AnalyseJobPosting from "./AnalyseJobPosting";

export default function Home() {
    const [chatBlobs, setChatBlobs] = useState<JSX.Element[]>([]);
    const [userSession, setUserSession] = useState({
        jobPosting: "",
        userAnswerEstimation: "",
        userAnswerCompany: "",
    });
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

    const createNewChatBlob = (data: string) => {
        const newChatBlob = (
            <div>
                <h1>{data}</h1>
            </div>
        );
        setChatBlobs((prevState) => [...prevState, newChatBlob]);
        console.log(newChatBlob);
    };
    return (
        <div className="flex flex-col items-center">
            <div
                className="flex flex-col items-center gap-4"
                style={{ width: 600 }}
            >
                <h1>Intervue</h1>
                <h1>Start your interview journey here!</h1>
                <p>Insert your job description!</p>
                {chatBlobs}
                <AnalyseJobPosting
                    register={register}
                    handleSubmit={handleSubmit}
                    createNewChatBlob={createNewChatBlob}
                    setUserSessionAttr={setUserSessionAttr}
                />
            </div>
        </div>
    );
}
