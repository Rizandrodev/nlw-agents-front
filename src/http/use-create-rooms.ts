import { useMutation } from "@tanstack/react-query";
import type { CreateRoomrequest } from "./types/create-room-request";
export function UseCreateRoom(){
  return useMutation({
    mutationFn:async (data:CreateRoomrequest)=>{
      const  response=await fetch('http://localhost:3333/rooms',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      const result=response.json()
      return result
    },

  })
}