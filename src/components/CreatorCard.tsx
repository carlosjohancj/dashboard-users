import { useState } from 'react'
import { Users, Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app-store'
import { useToast } from '@/hooks/use-toast'
import type { Creator } from '@/store/app-store'

interface CreatorCardProps {
  creator: Creator
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const { followCreator, unfollowCreator } = useAppStore()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleFollowToggle = async () => {
    setIsLoading(true)
    
    setTimeout(() => {
      if (creator.isFollowing) {
        unfollowCreator(creator.id)
        toast({
          title: "Has dejado de seguir",
          description: `Ya no sigues a ${creator.name}`
        })
      } else {
        followCreator(creator.id)
        toast({
          title: "¡Ahora sigues a este creator!",
          description: `Comenzaste a seguir a ${creator.name}`
        })
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg">{creator.name}</h3>
            <Badge variant="secondary">Creator</Badge>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {creator.description}
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              {creator.followers.toLocaleString()} seguidores
            </div>
            <div className="text-sm font-semibold text-primary">
              ${creator.subscriptionPrice}/mes
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={creator.isFollowing ? "outline" : "default"}
              size="sm"
              onClick={handleFollowToggle}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${creator.isFollowing ? 'fill-current' : ''}`} />
              {isLoading ? 'Cargando...' : creator.isFollowing ? 'Siguiendo' : 'Seguir'}
            </Button>
            
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Mensaje
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}