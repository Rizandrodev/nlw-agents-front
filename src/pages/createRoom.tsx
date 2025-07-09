import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getRelativeTime } from "../../util/day-fn"
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
  QuestionsCount:number;
  createdAt:string 
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const result: GetRoomsAPIResponse = await response.json();
      return result;
    }
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                Salas recentes
              </CardTitle>
               <CardDescription>Acesso rapido as salas criadas recentementes </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
            {data?.map((room)=>{
              return( 
              <Link
               className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent " 
               key={room.id}
               to={`/rooms/${room.id}`} 
               >
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-medium">{room.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      { getRelativeTime(room.createdAt)} 
                    </Badge>

                    <Badge variant="secondary">
                      {room.QuestionsCount} pergunta(s)
                    </Badge>
                  </div>
                </div>
                <span className="flex items-center gap-1">
                  Entrar
                  <ArrowRight className="size-3" />
                </span>
              </Link>)
            })} 
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
