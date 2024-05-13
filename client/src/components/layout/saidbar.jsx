import { Card, IconButton, Input } from '@material-tailwind/react'
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { useChatContext } from './../../context/chatContext';
import  SkeletonBar  from '../UI/skeleton';
import { useAuth } from '../../context/authContaxt';
import UserChat from '../chat/userChat';

const Saidbar = () => {
  const { user } = useAuth();
  const {userChats, isChatLoading, chatsError} = useChatContext();

  return (
    <Card className="col-start-2 col-end-4 row-span-8 bg-blue-gray-900 shadow-lg rounded-none rounded-l-lg px-6 py-4">
      <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Search..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <IconButton variant="text" color="white">
              <IoIosSearch className="h-4 w-4"/>
            </IconButton>
      </div>
      <div className='py-8'>
        {userChats?.length < 1 ? null : (
          <div>
            {isChatLoading && <SkeletonBar/>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index}>
                  <UserChat chat={chat} user={user}/>
                </div>
              )
            })}
          </div>
        )} 
      </div>
    </Card>
  )
}

export default Saidbar