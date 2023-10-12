import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hook/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
// import { TbSend } from "react-icons/tb";

const ChatBox = () => {
    const {user} = useContext(AuthContext);
    const{currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

    if(!recipientUser) {
        return (
        <p className="text-left w-full">
            No conversation selected yet...
        </p>
        )
    };

    if(isMessagesLoading) {
        return (
        <p className="text-center w-full">
            Loading chat...
        </p>
        )
    };
 
    // console.log(recipientUser);

    return ( <div className="chat-box w-[70%] h-screen gap-2 relative">
        <div className="chat-header">
            <strong>{recipientUser?.name}</strong>
        </div>
        <div className="messages flex flex-col">
            {messages && messages.map((message, index)=>(
                <div key={index} className={`${message?.senderId === user?._id ? "message self self-end flex-grow-0" : "message self-start flex-grow-0"} mt-4`}>
                    <span>{message.text}</span><br />
                    <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    {/* {console.log(message?.senderId, user?._id)} */}
                </div>
            ))}
        </div>
        <div className="flex gap-4 chat-input flex-grow-0 absolute bottom-0">
            <InputEmoji 
            value = {textMessage} 
            onChange={setTextMessage} 
            fontFamily="Manrope" 
            borderColor="rgba(72, 112, 223, 0.2)" />
            <button className="items-center" onClick={()=> sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00bd9b" className="w-6 h-6">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>

            </button>
        </div>
    </div> );
}
 
export default ChatBox;