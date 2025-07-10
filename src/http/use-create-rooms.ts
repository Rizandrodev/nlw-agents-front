import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateRoomrequest } from "./types/create-room-request"

export function UseCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomrequest) => {
      const response = await fetch("http://localhost:3333/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      return result
    },

    onSuccess: () => {//    Depois que eu crio uma nova sala com POST /rooms, atualiza a lista de salas automaticamente.
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] })
    }
  })
}
