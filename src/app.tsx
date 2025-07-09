import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CreateRoom } from "./pages/createRoom"
import { Room } from "./pages/rooms"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          {/** biome-ignore assist/source/useSortedAttributes: <explanation> */}
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App
