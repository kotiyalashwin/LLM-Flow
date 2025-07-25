"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ReactMarkdown, { Components } from "react-markdown"

interface ResponseContentProps {
  data: Record<string, string>
}

export default function ResponseContent({ data }: ResponseContentProps) {
  // Convert object to array of entries to maintain order
  const responses = Object.entries(data)

  if (responses.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No responses available</div>
  }

  // Get the last response key to show it expanded
  const lastResponseKey = responses[responses.length - 1][0]
  const markdownComponents:Components = {
   
    p: ({ children }) => <p className="text-xs leading-relaxed text-muted-foreground">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 text-xs text-muted-foreground ml-2">{children}</ol>
    ),
    li: ({ children }) => <li className="text-xs leading-relaxed">{children}</li>,
    h1: ({ children }) => <h1 className="text-sm font-semibold text-foreground mt-2 mb-1">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xs font-semibold text-foreground mt-2 mb-1">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xs font-medium text-foreground mt-1 mb-1">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-muted pl-2 text-xs text-muted-foreground italic">{children}</blockquote>
    ),
    hr: () => <hr className="border-muted my-2" />,
  }

  return (
    <div className="space-y-4 p-2 overflow-y-scroll">
     

      {/* Show all responses in accordion if there are more than one */}
      {responses.length > 1 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium mb-3">All Responses</h2>
          <Accordion type="single" collapsible className="w-full " defaultValue={lastResponseKey}>
            {responses.map(([key, value]) => (
              <AccordionItem key={key} value={key} className="border-b  ">
                <AccordionTrigger className="text-left text-xs py-2 hover:no-underline">
                  Response for the {key} node
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-2 overflow-x-scroll" >
                    <ReactMarkdown
                    //   className="prose prose-xs max-w-none [&>*]:my-1 [&>p]:my-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                      components={markdownComponents}
                    >
                      {value}
                    </ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
       {/* <div className="border rounded-lg p-3 bg-card">
        <h3 className="font-medium mb-2 text-sm">Response for the {lastResponseKey} node</h3>
        <div className="text-xs leading-relaxed text-muted-foreground">
          <ReactMarkdown
            // className="prose prose-xs max-w-none [&>*]:my-1 [&>p]:my-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            components={markdownComponents}
          >
            {responses[responses.length - 1][1]}
          </ReactMarkdown>
        </div>
      </div> */}
    </div>
  )
}
