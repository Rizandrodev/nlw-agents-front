/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";


//your browser suport recording audio
const isRecordingSupported = !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
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
        console.log(event.data)
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