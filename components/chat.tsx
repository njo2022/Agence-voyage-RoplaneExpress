"use client"

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { X, Send, MessageCircle } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Bienvenue chez Roplane Express. Comment puis-je vous aider à planifier votre voyage de rêve ?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
      setInputValue('')
      
      // Simulation de réponse automatique
      setTimeout(() => {
        const responses = [
          "Merci pour votre message ! Un de nos conseillers vous contactera dans les plus brefs délais.",
          "Excellente question ! Laissez-moi vous mettre en contact avec notre expert en voyages de luxe.",
          "Nous avons de nombreuses destinations exclusives qui pourraient vous intéresser. Voulez-vous en savoir plus ?",
          "Votre demande est très importante pour nous. Notre équipe vous répondra sous 2 heures maximum.",
          "Parfait ! Nous allons créer un itinéraire sur mesure pour vous. Quel est votre budget approximatif ?"
        ]
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const botMessage: Message = {
          id: messages.length + 2,
          text: randomResponse,
          isUser: false,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Bouton de chat flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-accent text-accent-foreground p-4 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-accent text-accent-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Roplane Express</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-accent-foreground hover:bg-accent-foreground/20 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Export dynamique pour éviter les erreurs SSR
const Chat = dynamic(() => Promise.resolve(ChatComponent), {
  ssr: false,
  loading: () => null
})

export default Chat
