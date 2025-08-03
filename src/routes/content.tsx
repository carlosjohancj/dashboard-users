import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  Heart, 
  Eye, 
  DollarSign,
  Star,
  Clock,
  User
} from 'lucide-react'

export const Route = createFileRoute('/content')({
  component: ContentPage,
})

function ContentPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const contentItems = [
    {
      id: '1',
      title: 'Tutorial de React Avanzado',
      description: 'Aprende técnicas avanzadas de React con hooks personalizados y optimización de rendimiento',
      creator: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      price: 29.99,
      category: 'programming',
      rating: 4.8,
      views: 1250,
      likes: 89,
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Diseño UI/UX Moderno',
      description: 'Principios de diseño moderno y herramientas para crear interfaces atractivas',
      creator: {
        name: 'Carlos López',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      price: 19.99,
      category: 'design',
      rating: 4.6,
      views: 890,
      likes: 67,
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'Marketing Digital Completo',
      description: 'Estrategias de marketing digital que funcionan en 2024',
      creator: {
        name: 'Ana Martínez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      price: 39.99,
      category: 'marketing',
      rating: 4.9,
      views: 2100,
      likes: 156,
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Fotografía Profesional',
      description: 'Técnicas de fotografía para principiantes y avanzados',
      creator: {
        name: 'Luis Rodríguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      price: 24.99,
      category: 'photography',
      rating: 4.7,
      views: 1560,
      likes: 98,
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: 'Finanzas Personales',
      description: 'Aprende a gestionar tu dinero y crear riqueza a largo plazo',
      creator: {
        name: 'Sofia Herrera',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
      },
      price: 34.99,
      category: 'finance',
      rating: 4.5,
      views: 980,
      likes: 72,
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      title: 'Cocina Internacional',
      description: 'Recetas de todo el mundo con técnicas profesionales',
      creator: {
        name: 'Pedro Sánchez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      price: 14.99,
      category: 'cooking',
      rating: 4.4,
      views: 720,
      likes: 45,
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop'
    }
  ]

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'programming', label: 'Programación' },
    { value: 'design', label: 'Diseño' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'photography', label: 'Fotografía' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'cooking', label: 'Cocina' }
  ]

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar Contenido</h1>
          <p className="text-gray-600">Descubre contenido exclusivo de creators talentosos</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar contenido, creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map(item => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {item.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={item.creator.avatar} alt={item.creator.name} />
                    <AvatarFallback>{item.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{item.creator.name}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {item.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {item.likes}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 font-bold text-green-600">
                    <DollarSign className="w-4 h-4" />
                    {item.price}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">Ver Detalles</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron resultados</p>
            <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
} 