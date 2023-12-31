import { Box } from "@chakra-ui/react";
import { PrettyChatWindow } from "react-chat-engine-pretty";

const MessagesPage = ({ chatUser }) => {

  return (

      <Box w={'100%'} position={'fixed'} top={'90px'} left={0} zIndex={0} h={'85%'}>
          <PrettyChatWindow
            projectId={`${process.env.REACT_APP_CHAT_ENGINE_API_KEY}`}
            username={chatUser.username}
            secret={chatUser.secret}
          />
      </Box>

  )
}

export default MessagesPage