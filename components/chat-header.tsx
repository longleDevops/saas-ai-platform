import { Companion, Message } from "@prisma/client"
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { Button } from "./ui/button";
import { BotAvatar } from "./bot-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import axios from "axios";


interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    }
  }
}

export const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter();

  // {user} from useUser() or {userId} from auth()
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      // sending POST to delete within server side
      await axios.delete(`/api/companion/${companion.id}`)

      toast({
        description: "Success."
      });

      router.refresh();
      router.push("/")
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button
          onClick={() => router.back()}
          size="icon"
          variant="ghost"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">
              {companion.name}
            </p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>

      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="mr-2 w-4 h-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="mr-2 w-4 h-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>
      )}
    </div>
  )
}