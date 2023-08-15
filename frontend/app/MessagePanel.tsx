import {
    Card,
    IconButton,
    TextField,
    Avatar,
    Badge,
    Text,
} from "@radix-ui/themes";
import Image from "next/image";

const MessagePanel: React.FC = () => {
    return (
        <div className="flex flex-col border-r">
            {/* Message Panel Header */}
            <div
                className="flex justify-between border-b"
                style={{ padding: 24 }}
            >
                <div className="flex items-center">
                    <h4>Message</h4>
                    <Image
                        width="16"
                        height="16"
                        src="/icon/chevron-down.svg"
                        alt="message option"
                    />
                </div>
                <IconButton variant="soft">
                    <Image
                        width="40"
                        height="40"
                        src="/icon/plus.svg"
                        alt="add chat"
                    />
                </IconButton>
            </div>

            {/* Search Div */}
            <div style={{ padding: "12px 24px 12px 24px" }}>
                <TextField.Root radius="full">
                    <TextField.Slot>
                        <span>Search</span>
                    </TextField.Slot>
                    <TextField.Input placeholder="Search messages" />
                </TextField.Root>
            </div>

            {/* Message History */}
            <div
                className="flex flex-col gap-2 border-r-gray-700"
                style={{ padding: " 0 16px 0 16px" }}
            >
                <Card className="cursor-pointer">
                    <div className="flex gap-2">
                        <Avatar src="" size="3" fallback="I" />
                        <div className="flex">
                            <div style={{ width: 186 }}>
                                <div className="flex flex-col mb-2">
                                    <Text size="3">Zoey</Text>
                                    <Text
                                        size="1"
                                        color="gray"
                                        className="truncate"
                                    >
                                        PM interview for healthcare company
                                    </Text>
                                </div>
                                <div className="flex gap-1">
                                    <Badge radius="full">B2B</Badge>
                                    <Badge radius="full">PM</Badge>
                                    <Badge radius="full">Healthcare</Badge>
                                </div>
                            </div>
                            <Text size="1" color="gray">
                                24m
                            </Text>
                        </div>
                    </div>
                </Card>
                <Card className="cursor-pointer">
                    <div className="flex gap-2">
                        <Avatar src="" size="3" fallback="I" />
                        <div className="flex">
                            <div style={{ width: 186 }}>
                                <div className="flex flex-col mb-2">
                                    <Text size="3">Zoey</Text>
                                    <Text
                                        size="1"
                                        color="gray"
                                        className="truncate"
                                    >
                                        PM interview for healthcare company
                                    </Text>
                                </div>
                                <div className="flex gap-1">
                                    <Badge radius="full">B2B</Badge>
                                    <Badge radius="full">PM</Badge>
                                    <Badge radius="full">Healthcare</Badge>
                                </div>
                            </div>
                            <Text size="1" color="gray">
                                24m
                            </Text>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MessagePanel;
