import { Bot, Loader2, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getRelativeTime } from "../../util/day-fn"

interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
}

interface QuestionItemProps {
  question: Question
}

export function QuestionItem({ question }: QuestionItemProps) {
  const isGenerating = !question.answer

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Pergunta */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {/* Resposta */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <Bot className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Resposta da IA</p>
              {isGenerating ? (
                <div className="flex items-center space-x-2 text-primary text-sm italic">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Gerando resposta...</span>
                </div>
              ) : (
                <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                  {question.answer}
                </p>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {getRelativeTime(question.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
