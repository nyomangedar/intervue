import Image from "next/image";
import { Box, Grid, Card, Text, Flex, Avatar } from "@radix-ui/themes";
export default function Home() {
    return (
        <div>
            <Grid columns="3" gap="3" width="auto">
                <Flex gap="2">
                    <Avatar
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        fallback="Woi nge"
                    />
                    <Avatar fallback="Woi nge" />
                </Flex>
                <Flex gap="2">
                    <Avatar
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        fallback="namanya juga"
                    />
                    <Avatar fallback="namanya juga" />
                </Flex>
                <Flex gap="2">
                    <Avatar
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        fallback="idup"
                    />
                    <Avatar fallback="idup" />
                </Flex>
            </Grid>
        </div>
    );
}
