import ChatBox from "../components/chat/ChatBox";
import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";


const Chat = () => {

    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

    // console.log(
    //     "UserChats", userChats
    // );

    return  <div className="container">
        <PotentialChats />
        {userChats?.length < 1 ? null : (<div className="flex flex-grow-0 gap-16 items-start">
            <div className="messages-box flex-grow-0 gap-3">
                {isUserChatsLoading && <p>Loading Chats...</p>}
                {userChats?.map((chat, index) => {
                    return <div key={index} onClick={() => updateCurrentChat(chat)}>
                        <UserChat chat={chat} user={user}/>
                    </div>
                })}
            </div>
            <ChatBox />
        </div>)} 
    </div> ;
}
 
export default Chat;