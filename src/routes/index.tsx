import { createFileRoute, redirect } from '@tanstack/react-router'
import { ImageSlider } from '@/components/ImageSlider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/auth-store'
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Star,
  Crown,
  ArrowRight,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Eye
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: DashboardPage,
  beforeLoad: ({ context }) => {
    const authStore = useAuthStore.getState()
    if (!authStore.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  }
})

function DashboardPage() {

  const slides = [
    {
      id: '1',
      title: 'Bienvenido a mi Comunidad',
      description: 'Aquí comparto contenido exclusivo y conecto con mi audiencia',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      link: '/dashboard'
    },
    {
      id: '2',
      title: 'Contenido Exclusivo',
      description: 'Accede a contenido premium y tutoriales avanzados',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      link: '/content'
    },
    {
      id: '3',
      title: 'Comunidad VIP',
      description: 'Únete a mi comunidad exclusiva de seguidores',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      link: '/vip'
    }
  ]

  const blogPosts = [
    {
      id: '1',
      title: 'Cómo optimizar el rendimiento de React en 2024',
      excerpt: 'En este post te comparto las mejores técnicas para optimizar el rendimiento de tus aplicaciones React, incluyendo lazy loading, memoización y más...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      author: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'Desarrolladora Full Stack'
      },
      publishDate: '2024-01-15',
      readTime: '8 min',
      category: 'Programación',
      tags: ['React', 'Optimización', 'Performance'],
      likes: 156,
      comments: 23,
      views: 1240,
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Diseño de interfaces modernas con Figma',
      excerpt: 'Aprende a crear interfaces de usuario atractivas y funcionales usando las mejores prácticas de diseño en Figma...',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'Desarrolladora Full Stack'
      },
      publishDate: '2024-01-12',
      readTime: '12 min',
      category: 'Diseño',
      tags: ['Figma', 'UI/UX', 'Diseño'],
      likes: 89,
      comments: 15,
      views: 890,
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'Estrategias de marketing digital que funcionan',
      excerpt: 'Descubre las estrategias de marketing digital más efectivas para hacer crecer tu negocio en línea...',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      author: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'Desarrolladora Full Stack'
      },
      publishDate: '2024-01-10',
      readTime: '10 min',
      category: 'Marketing',
      tags: ['Marketing', 'Digital', 'Estrategia'],
      likes: 203,
      comments: 31,
      views: 1560,
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Fotografía profesional para principiantes',
      excerpt: 'Guía completa para empezar en el mundo de la fotografía profesional con consejos prácticos...',
      content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      author: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'Desarrolladora Full Stack'
      },
      publishDate: '2024-01-08',
      readTime: '15 min',
      category: 'Fotografía',
      tags: ['Fotografía', 'Profesional', 'Tutorial'],
      likes: 134,
      comments: 28,
      views: 1120,
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop'
    }
  ]

  const stats = [
    {
      title: 'Posts Publicados',
      value: '24',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Seguidores',
      value: '1,247',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Likes Totales',
      value: '5,890',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Comentarios',
      value: '892',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Slider */}
        <div className="mb-8">
          <ImageSlider slides={slides} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Blog Feed */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Últimas Publicaciones</h2>
            <Button variant="outline">
              Ver todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  {post.isPremium && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{post.author.name}</p>
                      <p className="text-xs text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                    </div>
                    <span>{new Date(post.publishDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">Leer más</Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 flex flex-col items-center justify-center gap-2" asChild>
                <a href="/content">
                  <TrendingUp className="w-6 h-6" />
                  <span>Ver Contenido</span>
                </a>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2" asChild>
                <a href="/messages">
                  <MessageSquare className="w-6 h-6" />
                  <span>Mensajes</span>
                </a>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2" asChild>
                <a href="/vip">
                  <Crown className="w-6 h-6" />
                  <span>Comunidad VIP</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
