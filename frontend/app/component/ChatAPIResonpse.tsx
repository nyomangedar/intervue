export type ChatAPIResponse = {
    status: string;
    message: string;
    data: {
        data: {
            content: string;
            role: string;
        };
    };
};
