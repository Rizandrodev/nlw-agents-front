import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreateRoom } from "./pages/createRoom"
import { Room } from "./pages/room"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReacordRoomAudio } from "./pages/record-room-audio"

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          {/** biome-ignore assist/source/useSortedAttributes: <explanation> */}
          <Route path="/room/:roomId" element={<Room />} />
          {/** biome-ignore assist/source/useSortedAttributes: <explanation> */}
          <Route path="/room/:roomId/audio" element={<ReacordRoomAudio/>} />
 
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App
