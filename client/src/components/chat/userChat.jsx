import { Card } from "@material-tailwind/react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({user, chat}) => {
  const { recipientUser} = useFetchRecipientUser(chat, user);

  console.log(recipientUser);
  return ( 
    <Card></Card>
   );
}
 
export default UserChat;
