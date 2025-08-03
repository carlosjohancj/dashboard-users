import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'vip'
  balance: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulación de login - en producción esto sería una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (email === 'admin@example.com' && password === 'admin123') {
          const user: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            role: 'admin',
            balance: 1000
          }
          
          set({ user, isAuthenticated: true, isLoading: false })
          return true
        } else if (email === 'user@example.com' && password === 'user123') {
          const user: User = {
            id: '2',
            name: 'Usuario Normal',
            email: 'user@example.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            role: 'user',
            balance: 500
          }
          
          set({ user, isAuthenticated: true, isLoading: false })
          return true
        } else if (email === 'vip@example.com' && password === 'vip123') {
          const user: User = {
            id: '3',
            name: 'Usuario VIP',
            email: 'vip@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            role: 'vip',
            balance: 2500
          }
          
          set({ user, isAuthenticated: true, isLoading: false })
          return true
        }
        
        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
        // Redirigir al login después de cerrar sesión
        window.location.href = '/login'
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulación de registro
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          role: 'user',
          balance: 100
        }
        
        set({ user, isAuthenticated: true, isLoading: false })
        return true
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
) 