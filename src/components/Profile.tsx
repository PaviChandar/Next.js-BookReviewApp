'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "lucide-react";

export default function ProfileMenu() {
//   const { data: session } = useSession();
  const [open, setOpen] = useState(false);

//   const username = session?.user?.name ?? "User";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Profile">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/default-avatar.png" alt={'username'} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-4">
        <div className="flex flex-col items-center">
          <User className="mb-2 h-6 w-6" />
          <p className="font-medium text-center">Admin</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
