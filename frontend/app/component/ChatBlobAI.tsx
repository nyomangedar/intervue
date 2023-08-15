import { Avatar } from "@radix-ui/themes";

const ChatBlobAI = (data: any) => {
    return (
        <div className="flex gap-2">
            <Avatar fallback="Z" />
            <div
                style={{
                    borderRadius: 16,
                    background: "#F1F1F1",
                    padding: "10px 16px 10px 16px",
                }}
                className="flex flex-col justify-center"
            >
                {data}
            </div>
        </div>
    );
};

export default ChatBlobAI;
