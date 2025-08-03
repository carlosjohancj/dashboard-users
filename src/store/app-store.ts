import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  isVip: boolean
  balance: number
}

export interface Creator {
  id: string
  name: string
  avatar: string
  description: string
  followers: number
  isFollowing: boolean
  subscriptionPrice: number
}

export interface Content {
  id: string
  creatorId: string
  title: string
  description: string
  type: 'video' | 'image' | 'audio' | 'document'
  price: number
  thumbnail: string
  url: string
  isPurchased: boolean
  createdAt: Date
  duration?: string
  size?: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  isRead: boolean
  type: 'text' | 'image' | 'file'
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: 'content' | 'subscription' | 'tip' | 'other'
  date: Date
  creatorId?: string
}

interface AppState {
  user: User | null
  creators: Creator[]
  contents: Content[]
  messages: Message[]
  expenses: Expense[]
  
  // Actions
  setUser: (user: User) => void
  addCreator: (creator: Creator) => void
  followCreator: (creatorId: string) => void
  unfollowCreator: (creatorId: string) => void
  purchaseContent: (contentId: string) => void
  addMessage: (message: Message) => void
  markMessageAsRead: (messageId: string) => void
  addExpense: (expense: Expense) => void
  updateBalance: (amount: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        id: '1',
        name: 'Usuario VIP',
        email: 'usuario@vip.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        isVip: true,
        balance: 500.00
      },
      creators: [
        {
          id: '1',
          name: 'Ana García',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
          description: 'Experta en desarrollo personal y productividad',
          followers: 15420,
          isFollowing: true,
          subscriptionPrice: 29.99
        },
        {
          id: '2',
          name: 'Carlos Mendez',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
          description: 'Instructor de programación y tecnología',
          followers: 8930,
          isFollowing: false,
          subscriptionPrice: 39.99
        },
        {
          id: '3',
          name: 'María López',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
          description: 'Coach de fitness y nutrición',
          followers: 22100,
          isFollowing: true,
          subscriptionPrice: 24.99
        }
      ],
      contents: [
        {
          id: '1',
          creatorId: '1',
          title: 'Masterclass: Productividad Extrema',
          description: 'Aprende las técnicas más efectivas para maximizar tu productividad diaria',
          type: 'video',
          price: 19.99,
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
          url: 'https://example.com/video1',
          isPurchased: true,
          createdAt: new Date('2024-01-15'),
          duration: '2h 30min'
        },
        {
          id: '2',
          creatorId: '2',
          title: 'Curso Completo de React',
          description: 'Domina React desde cero hasta nivel avanzado',
          type: 'video',
          price: 49.99,
          thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
          url: 'https://example.com/video2',
          isPurchased: false,
          createdAt: new Date('2024-01-10'),
          duration: '8h 45min'
        },
        {
          id: '3',
          creatorId: '3',
          title: 'Plan de Entrenamiento Personalizado',
          description: 'Rutina de ejercicios adaptada a tus objetivos',
          type: 'document',
          price: 14.99,
          thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
          url: 'https://example.com/document1',
          isPurchased: true,
          createdAt: new Date('2024-01-12'),
          size: '2.5 MB'
        }
      ],
      messages: [
        {
          id: '1',
          senderId: '1',
          receiverId: '1',
          content: '¡Hola! Gracias por seguir mi contenido. ¿Tienes alguna pregunta sobre la masterclass?',
          timestamp: new Date('2024-01-16T10:30:00'),
          isRead: false,
          type: 'text'
        },
        {
          id: '2',
          senderId: '1',
          receiverId: '1',
          content: 'Me alegra saber que te gustó el contenido. Pronto subiré más material.',
          timestamp: new Date('2024-01-15T15:45:00'),
          isRead: true,
          type: 'text'
        }
      ],
      expenses: [
        {
          id: '1',
          description: 'Masterclass: Productividad Extrema',
          amount: 19.99,
          category: 'content',
          date: new Date('2024-01-15'),
          creatorId: '1'
        },
        {
          id: '2',
          description: 'Plan de Entrenamiento Personalizado',
          amount: 14.99,
          category: 'content',
          date: new Date('2024-01-12'),
          creatorId: '3'
        },
        {
          id: '3',
          description: 'Suscripción mensual - Ana García',
          amount: 29.99,
          category: 'subscription',
          date: new Date('2024-01-01'),
          creatorId: '1'
        }
      ],

      setUser: (user) => set({ user }),
      
      addCreator: (creator) => set((state) => ({
        creators: [...state.creators, creator]
      })),
      
      followCreator: (creatorId) => set((state) => ({
        creators: state.creators.map(creator =>
          creator.id === creatorId
            ? { ...creator, isFollowing: true, followers: creator.followers + 1 }
            : creator
        )
      })),
      
      unfollowCreator: (creatorId) => set((state) => ({
        creators: state.creators.map(creator =>
          creator.id === creatorId
            ? { ...creator, isFollowing: false, followers: creator.followers - 1 }
            : creator
        )
      })),
      
      purchaseContent: (contentId) => set((state) => {
        const content = state.contents.find(c => c.id === contentId)
        if (!content || !state.user) return state
        
        const newExpense: Expense = {
          id: Date.now().toString(),
          description: content.title,
          amount: content.price,
          category: 'content',
          date: new Date(),
          creatorId: content.creatorId
        }
        
        return {
          contents: state.contents.map(c =>
            c.id === contentId ? { ...c, isPurchased: true } : c
          ),
          expenses: [...state.expenses, newExpense],
          user: { ...state.user, balance: state.user.balance - content.price }
        }
      }),
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
      })),
      
      markMessageAsRead: (messageId) => set((state) => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      })),
      
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, expense]
      })),
      
      updateBalance: (amount) => set((state) => ({
        user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
      }))
    }),
    {
      name: 'vip-app-storage'
    }
  )
)