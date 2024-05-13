import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {

  const [userChats, setUserChats] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatsError, setChatsError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if(user?._id){
        setIsChatLoading(true);
        setChatsError(null);
        const response = await getRequest(`http://localhost/8000/api/chats/${user?._id}`)
        setIsChatLoading(false);
        if(response.error){
          return setChatsError(response);
        }

        setUserChats(response);
      }
    }

    getUserChats();
  }, [user])

  return (
    <ChatContext.Provider value={{userChats, isChatLoading, chatsError}}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => useContext(ChatContext);