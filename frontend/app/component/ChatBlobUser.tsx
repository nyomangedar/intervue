import { Avatar } from "@radix-ui/themes";

const ChatBlobUser = (data: any) => {
    return (
        <div className="flex gap-2 justify-end">
            <div
                className="flex flex-col items-center"
                style={{
                    borderRadius: 16,
                    background: "#615EF0",
                    padding: "10px 16px 10px 16px",
                    color: "white",
                }}
            >
                {data}
            </div>
            <Avatar fallback="Z" />
        </div>
    );
};

export default ChatBlobUser;
