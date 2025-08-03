import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Send, 
  MoreVertical,
  Phone,
  Video,
  Image,
  Paperclip,
  Smile
} from 'lucide-react'

export const Route = createFileRoute('/messages')({
  component: MessagesPage,
})

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>('1')
  const [messageText, setMessageText] = useState('')

  const conversations = [
    {
      id: '1',
      name: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: '¡Hola! ¿Cómo va el proyecto?',
      time: '2 min',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Carlos López',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Gracias por el feedback sobre el diseño',
      time: '1 hora',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'El nuevo contenido está listo para revisión',
      time: '3 horas',
      unread: 1,
      isOnline: true
    },
    {
      id: '4',
      name: 'Luis Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: '¿Te gustaría colaborar en un proyecto?',
      time: '1 día',
      unread: 0,
      isOnline: false
    }
  ]

  const messages = [
    {
      id: '1',
      sender: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: '¡Hola! ¿Cómo va el proyecto?',
      time: '14:30',
      isOwn: false
    },
    {
      id: '2',
      sender: 'Tú',
      avatar: null,
      content: '¡Hola María! Todo va muy bien, gracias por preguntar. ¿Cómo estás tú?',
      time: '14:32',
      isOwn: true
    },
    {
      id: '3',
      sender: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: '¡Excelente! Me alegra escuchar eso. ¿Necesitas ayuda con algo específico?',
      time: '14:33',
      isOwn: false
    },
    {
      id: '4',
      sender: 'Tú',
      avatar: null,
      content: 'Sí, tengo algunas preguntas sobre el nuevo contenido que publicaste',
      time: '14:35',
      isOwn: true
    },
    {
      id: '5',
      sender: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: '¡Perfecto! Estoy aquí para ayudarte. ¿Qué te gustaría saber?',
      time: '14:36',
      isOwn: false
    }
  ]

  const selectedConversation = conversations.find(c => c.id === selectedChat)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Aquí se enviaría el mensaje
      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Sidebar - Conversations */}
            <div className="border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Mensajes</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar conversaciones..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(600px-80px)]">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedChat(conversation.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      
                      {conversation.unread > 0 && (
                        <Badge className="ml-2" variant="destructive">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedConversation?.avatar} alt={selectedConversation?.name} />
                        <AvatarFallback>{selectedConversation?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversation?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation?.isOnline ? 'En línea' : 'Desconectado'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isOwn && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.avatar || ''} alt={message.sender} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[70%] ${message.isOwn ? 'order-first' : ''}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              message.isOwn
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Image className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Smile className="w-4 h-4" />
                      </Button>
                      
                      <Input
                        placeholder="Escribe un mensaje..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Selecciona una conversación
                    </h3>
                    <p className="text-gray-500">
                      Elige una conversación para empezar a chatear
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 