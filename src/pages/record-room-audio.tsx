/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useParams } from "react-router-dom";


//your browser suport recording audio
const isRecordingSupported = !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

  type RoomParams   = {
  roomId: string
}

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  
    const params = useParams<RoomParams>()

  
async function uploadAudio(audio: Blob) {
    const formData = new FormData(); // Usando multipart/form-data para enviar arquivo
    formData.append('file', audio, 'audio.webm');

    try {
      const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
        method: 'POST',
        body: formData,
      });

      console.log(response); // <- Movido para fora do `return`
      return response;
    } catch (error) {
      console.error('Erro ao enviar áudio:', error);
    }
  }

  
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }


  

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Teu Browser nao suporta Audio")
    }
    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100
      }
    })

    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_800
    })  

    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravacao Iniciada  ')
    }
    recorder.current.onstop = () => {
      console.log('Gravacao Encerrada/pausada  ')
    }

    recorder.current.start()
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-3'>
      {isRecording ? (
        <Button onClick={stopRecording}>
          Pausar Gravacao
        </Button>
      ) : (
        <Button onClick={startRecording}>
          Gravar Audio
        </Button>
      )

      }

      {isRecording ? <p>Gravando...</p> : <p>Pausado </p>}
    </div>
  )
}