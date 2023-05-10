import {MultiChatSocket, MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced"
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic("cae85500-797f-4545-9eb1-97813070d345", props.user.username, props.user.secret);

    return (
        <div style={{ height: "100vh"}}>
            <MultiChatSocket {...chatProps}/>
            <MultiChatWindow {...chatProps} style={{ height: '100%'}}/>
        </div>
)
}
export default ChatsPage