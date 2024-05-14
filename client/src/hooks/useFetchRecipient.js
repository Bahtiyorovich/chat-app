import { useEffect, useState } from "react"

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id)
  console.log("Chat", chat)
  useEffect(() => {
    const getUser = async () => {
      if(!recipientId) return null;

      const response = await getRequest(`http://localhost/8000/api/users/find/${recipientId}`)
      if(response.error){
        return setError(error);
      }

      setRecipientUser(response);
    }

    getUser();

  }, [])

  return { recipientUser}

}