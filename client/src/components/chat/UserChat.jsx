import { useFetchRecipientUser } from "../../hook/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({chat, user}) => {

    const {recipientUser} = useFetchRecipientUser(chat, user);
    const {onlineUsers} = useContext(ChatContext);
    // console.log(recipientUser);

    const isUserOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

    return (
    <div className="flex user-card items-center justify-between mt-2">
        <div className="flex">
            <div className="mr-3">
                <img src={avatar} className="h-9" />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="flex flex-col items-end mt-2">
            <div className="date">17/08/2023</div>
            <div className="this-user-notifications">2</div>
            <span className={isUserOnline ? "user-online" : ""}></span>
        </div>
    </div>
)}
 
export default UserChat;