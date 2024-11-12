import React, { useEffect, useRef } from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 每次消息更新时，滚动到底部
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
      <div ref={messageEndRef} />
    </div>
  );
}