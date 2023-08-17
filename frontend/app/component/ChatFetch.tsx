import { UserAnswer } from "./UserAnswer";

const returnAPIURL = () => {
    if (process.env.NODE_ENV == "development") {
        return "http://127.0.0.1:8000/chat-api";
    }
    return "http://20.121.136.232/api/chat-api";
};

const ChatAPIURL = returnAPIURL();

export const ChatFetcher = async (
    url: string,
    data: UserAnswer,
    loadingHandle: (state: boolean) => void
) => {
    loadingHandle(true);
    const res = await fetch(`${ChatAPIURL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
    loadingHandle(false);
    return res;
};

export const ChatAPIList = {
    analyseJob: "/analyze-job-posting",
    caseStudyEst: "/casestudy-estimation",
    scoringEst: "/scoring-estimation",
    caseStudyComp: "/casestudy-company",
    rubricComp: "/rubric-company",
    scoringComp: "/scoring-company",
    feedback: "/feedback",
    question: "/question",
};

export const ChatSessionList = {
    jobPosting: "jobPosting",
    userAnswerEstimation: "userAnswerEstimation",
    userEstScore: "userEstScore",
    userAnswerCompany: "userAnswerCompany",
    userCompScore: "userCompScore",
    questionEst: "questionEst",
    questionComp: "questionComp",
    companyRubric: "companyRubric",
    userDiscussionEst: "userDiscussionEst",
    userDiscussionComp: "userDiscussionComp",
};
