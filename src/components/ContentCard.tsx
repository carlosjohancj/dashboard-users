import { useState } from 'react'
import { Play, Download, Lock, Clock, FileText, Image, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app-store'
import { useToast } from '@/hooks/use-toast'
import type { Content } from '@/store/app-store'

interface ContentCardProps {
  content: Content
}

export function ContentCard({ content }: ContentCardProps) {
  const { purchaseContent, user } = useAppStore()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const getTypeIcon = () => {
    switch (content.type) {
      case 'video':
        return <Play className="w-4 h-4" />
      case 'image':
        return <Image className="w-4 h-4" />
      case 'audio':
        return <Music className="w-4 h-4" />
      case 'document':
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const handlePurchase = async () => {
    if (!user) return
    
    if (user.balance < content.price) {
      toast({
        title: "Saldo insuficiente",
        description: "No tienes suficiente saldo para comprar este contenido",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    // Simular compra
    setTimeout(() => {
      purchaseContent(content.id)
      toast({
        title: "¡Compra exitosa!",
        description: `Has adquirido "${content.title}"`
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            {getTypeIcon()}
            {content.type}
          </Badge>
        </div>
        {!content.isPurchased && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{content.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {content.duration || content.size}
          </div>
          <div className="text-xl font-bold text-primary">
            ${content.price}
          </div>
        </div>
        
        {content.isPurchased ? (
          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Ver contenido
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            onClick={handlePurchase}
            disabled={isLoading}
          >
            {isLoading ? 'Comprando...' : 'Comprar ahora'}
          </Button>
        )}
      </div>
    </div>
  )
}