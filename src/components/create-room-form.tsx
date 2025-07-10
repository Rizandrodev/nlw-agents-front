import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { UseCreateRoom } from "@/http/use-create-rooms";

const createRoomSchema=z.object({
  name:z.string().min(3,{message:'Inclua no minimo 3 caracateres'}),
  description:z.string()
})

type createRoomFormData=z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const {mutateAsync:createRoom}=UseCreateRoom()
  const createRoomForm = useForm<createRoomFormData>({
    resolver:zodResolver(createRoomSchema),
    defaultValues:{
      name:'',
      description:''
    }
  })

  async function handleCreateRoom({name,description}:createRoomFormData){
    await createRoom({name,description})
   createRoomForm.reset()
  }
  return (
    <div>
      <Card>
        <CardHeader>  
          <CardTitle>Criar Sala</CardTitle>
          <CardDescription >
            Crie uma nova sala pra comecar a fazer perguntas e
            receber respostas
            de I.A
          </CardDescription>
          </CardHeader>
          <CardContent>
          <Form {...createRoomForm}>
            <form
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
             className='flex flex-col gap-4' 
             >
                     <FormField
                      control={createRoomForm.control}
                      name="name"
                      render={({ field }) => {
                        return(
                            <FormItem >
                              <FormLabel>Nome da Sala</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Digite o Nome da sala"/>
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                        )
                      }}
                     />

                     <FormField
                      control={createRoomForm.control}
                      name="description"
                      render={({ field }) => {
                        return(
                            <FormItem >
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                        )
                      }}
                     />
                     <Button type="submit" className="w-full cursor-pointer" >
                        Criar Sala
                     </Button>
          </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  )
}