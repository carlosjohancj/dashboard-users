import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/auth-store'
import { 
  Crown, 
  Star, 
  Users, 
  Gift, 
  Zap,
  TrendingUp,
  MessageSquare,
  Calendar,
  Clock,
  Award,
  Heart
} from 'lucide-react'

export const Route = createFileRoute('/vip')({
  component: VipPage,
})

function VipPage() {
  const { user } = useAuthStore()

  const vipBenefits = [
    {
      title: 'Contenido Exclusivo',
      description: 'Acceso a contenido premium que no está disponible para usuarios regulares',
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Chat Directo',
      description: 'Comunicación directa con creators sin límites de mensajes',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Eventos VIP',
      description: 'Acceso a eventos exclusivos y meetups con creators',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Descuentos Especiales',
      description: 'Hasta 50% de descuento en contenido premium',
      icon: Gift,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  const vipMembers = [
    {
      id: '1',
      name: 'María García',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'VIP Gold',
      joinDate: '2024-01-15',
      posts: 45
    },
    {
      id: '2',
      name: 'Carlos López',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'VIP Platinum',
      joinDate: '2023-12-20',
      posts: 67
    },
    {
      id: '3',
      name: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'VIP Diamond',
      joinDate: '2023-11-10',
      posts: 89
    }
  ]

  const upcomingEvents = [
    {
      id: '1',
      title: 'Meetup con María García',
      description: 'Sesión de preguntas y respuestas sobre React avanzado',
      date: '2024-02-15',
      time: '19:00',
      attendees: 45,
      isExclusive: true
    },
    {
      id: '2',
      title: 'Workshop de Diseño UI/UX',
      description: 'Taller práctico con Carlos López',
      date: '2024-02-20',
      time: '15:00',
      attendees: 32,
      isExclusive: true
    },
    {
      id: '3',
      title: 'Networking VIP',
      description: 'Conecta con otros miembros VIP',
      date: '2024-02-25',
      time: '20:00',
      attendees: 28,
      isExclusive: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-12 h-12 text-yellow-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Comunidad VIP
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accede a contenido exclusivo, eventos especiales y conecta con creators de élite
          </p>
        </div>

        {/* VIP Status */}
        {user?.role === 'vip' ? (
          <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Crown className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-yellow-800">¡Bienvenido VIP!</h2>
                    <p className="text-yellow-700">Disfruta de todos los beneficios exclusivos</p>
                  </div>
                </div>
                <Badge className="bg-yellow-600 text-white px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Miembro VIP
                </Badge>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800">Únete a VIP</h2>
                    <p className="text-blue-700">Accede a contenido exclusivo y beneficios especiales</p>
                  </div>
                </div>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Hacerse VIP
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="benefits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits">Beneficios</TabsTrigger>
            <TabsTrigger value="members">Miembros</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vipBenefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Miembros VIP</h2>
              <Button variant="outline">Ver todos</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vipMembers.map(member => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Miembro desde {new Date(member.joinDate).toLocaleDateString('es-ES')}
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {member.posts} publicaciones
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      Ver perfil
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Próximos Eventos</h2>
              <Button>Crear evento</Button>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          {event.isExclusive && (
                            <Badge className="bg-yellow-600 text-white">
                              <Crown className="w-3 h-3 mr-1" />
                              Exclusivo
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString('es-ES')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendees} asistentes
                          </div>
                        </div>
                      </div>
                      
                      <Button>
                        Unirse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Miembros VIP</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Eventos Realizados</p>
                      <p className="text-2xl font-bold">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Satisfacción</p>
                      <p className="text-2xl font-bold">98%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 