import { useState } from 'react'
import { Send, Paperclip, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAppStore } from '@/store/app-store'
import type { Message } from '@/store/app-store'

export function MessageList() {
  const { messages, addMessage, markMessageAsRead, creators, user } = useAppStore()
  const [newMessage, setNewMessage] = useState('')
  const [selectedCreator, setSelectedCreator] = useState(creators[0]?.id || '')

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: selectedCreator,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    }

    addMessage(message)
    setNewMessage('')
  }

  const getCreatorById = (id: string) => {
    return creators.find(c => c.id === id)
  }

  const filteredMessages = messages.filter(
    msg => msg.senderId === selectedCreator || msg.receiverId === selectedCreator
  )

  return (
    <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <select
            value={selectedCreator}
            onChange={(e) => setSelectedCreator(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          >
            {creators.map(creator => (
              <option key={creator.id} value={creator.id}>
                {creator.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {filteredMessages.map(message => {
          const isFromUser = message.senderId === user?.id
          const creator = getCreatorById(message.senderId)
          
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isFromUser ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage 
                  src={isFromUser ? user?.avatar : creator?.avatar} 
                  alt={isFromUser ? user?.name : creator?.name}
                />
                <AvatarFallback>
                  {isFromUser ? user?.name.charAt(0) : creator?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className={`max-w-xs lg:max-w-md ${isFromUser ? 'text-right' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    isFromUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            <Smile className="w-4 h-4" />
          </Button>
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}