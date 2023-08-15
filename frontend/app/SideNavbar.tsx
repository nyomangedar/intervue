import { Avatar, IconButton } from "@radix-ui/themes";
import Image from "next/image";

const SideNavBar: React.FC = () => {
    return (
        <div
            className="flex flex-col items-center"
            style={{
                padding: 16,
                height: "100vw",
                boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.08)",
            }}
        >
            <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback=""
                size="5"
            />
            <div className="flex flex-col gap-3 mt-10">
                <IconButton variant="soft">
                    <Image
                        width="24"
                        height="24"
                        src="/icon/home-button.png"
                        alt="home-button"
                    />
                </IconButton>
                <IconButton variant="soft">
                    <Image
                        width="24"
                        height="24"
                        src="/icon/chat-button.svg"
                        alt="chat-button"
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default SideNavBar;
