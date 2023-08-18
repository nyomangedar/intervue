import { ChatInitiator } from "./component/ChatInitiator";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
const EndConversation: React.FC<ChatInitiator> = () => {
    const router = useRouter();
    return (
        <div style={{ padding: "8px 8px 8px 8px" }}>
            <p>Do you want to re-attempt the interview session?</p>
            <div>
                <Button onClick={() => location.reload()}>
                    <h2>Yes</h2>
                </Button>{" "}
                <Button>
                    <h2>No</h2>
                </Button>
            </div>
        </div>
    );
};

export default EndConversation;
