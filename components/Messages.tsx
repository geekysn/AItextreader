import React from 'react'
import { type Message as  TMessage } from 'ai/react'
import Message from './Message'
import { MessageSquare } from 'lucide-react'

interface MessagesProp {
    messages: TMessage[]
}

const Messages = ({messages}:MessagesProp) => {
  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto'>
        {
            messages.length ? messages.map((message, index) => (
                <Message key={index} content={message.content} isUserMessage={message.role === "user"}/>
            )) : <div className='flex-1 flex items-center justify-center flex-col gap-2'>
                <MessageSquare className='size-8 text-blue-500'/>
                <h3 className="font-semibold text-xl text-white">Help!!</h3>
                <p className='text-zinc-500 text-sm'>Ask Your Question first!</p>
            </div>
        }
    </div>
  )
}

export default Messages