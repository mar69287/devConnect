import { Box } from "@chakra-ui/react";
import { PrettyChatWindow } from "react-chat-engine-pretty";

const MessagesPage = ({ chatUser }) => {
    // console.log(process.env.REACT_APP_CHAT_ENGINE_API_KEY)
  return (

      <Box w={'100%'} position={'fixed'} top={'90px'} left={0} zIndex={3} h={'93%'}>
          <PrettyChatWindow
            projectId={`${process.env.REACT_APP_CHAT_ENGINE_API_KEY}`}
            username={chatUser.username}
            secret={chatUser.secret}
          />
      </Box>

  )
}

export default MessagesPage