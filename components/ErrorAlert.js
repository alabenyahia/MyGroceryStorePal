import React from 'react';
import {Alert, Box, Button, CloseIcon, Collapse, HStack, IconButton, Text, VStack} from "native-base";

const ErrorAlert = ({show, setShow, title, text}) => {

    return (<Box w="100%" alignItems="center">
        <Collapse isOpen={show}>
            <Alert maxW="400" status="error">
                <VStack space={1} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text fontSize="md" fontWeight="medium" _dark={{
                                color: "coolGray.800"
                            }}>
                                {title}
                            </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{
                            borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                            color: "coolGray.600"
                        }} onPress={() => setShow(false)} />
                    </HStack>
                    <Box pl="6" _dark={{
                        _text: {
                            color: "coolGray.600"
                        }
                    }}>
                        {text}
                    </Box>
                </VStack>
            </Alert>
        </Collapse>
        <Button size={"sm"} onPress={() => setShow(true)} mt={8} mx="auto">
            Re-Open
        </Button>
    </Box>)

};

export default ErrorAlert;
