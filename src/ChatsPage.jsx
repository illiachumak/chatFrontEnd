import {MultiChatSocket, MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced"
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic("fcf73ba8-90dc-41da-8ab1-3ae73618e9d0", props.user.username, props.user.secret);

    return (
        <div style={{ height: "100vh"}}>
            <MultiChatSocket {...chatProps}/>
            <MultiChatWindow {...chatProps} style={{ height: '100%'}}/>
        </div>
)
}
export default ChatsPage