import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateQuestionRequest } from "./types/create-question-request"
import type { CreateQuestionResponse } from "./types/create-question-response"

export function UseCreateQuestion(roomId:string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result:CreateQuestionResponse = await response.json()
      return result
    },

    onSuccess: () => {//    Depois que eu crio uma nova sala com POST /rooms, atualiza a lista de salas automaticamente.
      queryClient.invalidateQueries({ queryKey: ["get-questions ",roomId] })
    }
  })
}
