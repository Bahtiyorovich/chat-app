import { Card } from "@material-tailwind/react";
import NavbarDark from "../layout/navbar";
import Saidbar from "../layout/saidbar";
import Main from "../layout/main";

const Chat = () => {
  return ( 
    <Card className="grid grid-cols-8 grid-rows-9 gap-2 h-full w-full bg-transparent rounded-none overflow-hidden p-4">
      <NavbarDark/>
      <Saidbar/>
      <Main/>
    </Card>
   );
}
 
export default Chat;