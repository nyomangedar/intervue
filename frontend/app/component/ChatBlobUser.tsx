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
            <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="I"
            />
        </div>
    );
};

export default ChatBlobUser;
