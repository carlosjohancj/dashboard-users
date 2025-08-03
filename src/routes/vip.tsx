import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ContentCard } from '@/components/ContentCard'
import { CreatorCard } from '@/components/CreatorCard'
import { ExpenseChart } from '@/components/ExpenseChart'
import { MessageList } from '@/components/MessageList'
import { useAppStore } from '@/store/app-store'
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ShoppingBag,
  Crown,
  Star,
  DollarSign
} from 'lucide-react'

export const Route = createFileRoute('/vip')({
  component: VipApp,
})

function VipApp() {
  const { user, creators, contents, expenses } = useAppStore()

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const followedCreators = creators.filter(c => c.isFollowing).length
  const purchasedContent = contents.filter(c => c.isPurchased).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VIP Community
              </h1>
            </div>
            
            {user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                  <Wallet className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-700">
                    ${user.balance.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      VIP Member
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Gastado</p>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Creators Seguidos</p>
                <p className="text-2xl font-bold">{followedCreators}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Contenido Comprado</p>
                <p className="text-2xl font-bold">{purchasedContent}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Mensajes</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="expenses">Gastos</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Contenido Disponible</h2>
              <div className="flex gap-2">
                <Button variant="outline">Filtrar</Button>
                <Button variant="outline">Ordenar</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Creators</h2>
              <Button>Explorar más</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {creators.map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mensajes</h2>
              <Button>Nueva conversación</Button>
            </div>
            
            <MessageList />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Control de Gastos</h2>
              <div className="flex gap-2">
                <Button variant="outline">Exportar</Button>
                <Button>Agregar gasto</Button>
              </div>
            </div>
            
            <ExpenseChart />
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Historial de Gastos</h3>
              <div className="space-y-3">
                {expenses.slice(0, 10).map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-600">
                        {expense.date.toLocaleDateString('es-ES')} • {expense.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">-${expense.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}