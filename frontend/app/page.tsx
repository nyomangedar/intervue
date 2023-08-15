"use client";
import ChatPanel from "./ChatPanel";
import MessagePanel from "./MessagePanel";

const Chat: React.FC = () => {
    return (
        <>
            <div className="flex">
                <MessagePanel />
                <ChatPanel />
            </div>
        </>
    );
};

export default Chat;
