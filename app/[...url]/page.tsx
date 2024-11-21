import ChatWrapper from '@/components/ChatWrapper';
import { ragChat } from '@/lib/rag-chat';
import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';
import React from 'react'

interface PageProps {
    params: {
        url: string[] | undefined | string
    }
}

const reconstructURL = ({url}:{url: string[]}) => {
    const decodedURL = url.map((urlPart) => decodeURIComponent(urlPart));
    // console.log(decodedURL.join("/")); 
    return decodedURL.join("/");
}

const page = async ({params}:PageProps) => {
    const sessionCookie = cookies().get("sessionId")?.value; 
    const reconURL = reconstructURL({url:params.url as string[]});

    const sessionId = (reconURL+"--"+sessionCookie).replace(/\//g, "");
    // console.log(params);
    const isAlreadyIndexed = await redis.sismember("indexedURLs", reconURL);

    const initialMessages = await ragChat.history.getMessages({sessionId});

    if(!isAlreadyIndexed){
        await ragChat.context.add({
            type: "html",
            source: reconURL,
            config: {
                chunkOverlap:50,
                chunkSize: 200,
            }
        })
        await redis.sadd("indexedURLs", reconURL);  
    }
    return (
        <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
    )
}

export default page