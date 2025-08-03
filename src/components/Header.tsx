import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/auth-store'
import { Crown, LogOut, User } from 'lucide-react'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()

  if (!isAuthenticated) {
    return null
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-purple-600" />
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Mi Comunidad
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Inicio
            </Link>
            <Link to="/content" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contenido
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-gray-900 transition-colors">
              Mensajes
            </Link>
            <Link to="/vip" className="text-gray-600 hover:text-gray-900 transition-colors">
              VIP
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="font-medium text-sm">{user?.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {user?.role === 'vip' ? 'VIP Member' : 'Miembro'}
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
