import { Button, Column, ToastProvider, useToast, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

function ToastDemo() {
  const toast = useToast()
  return (
    <Button
      onClick={() =>
        toast.show({
          title: 'Saved',
          description: 'Your changes were saved successfully.',
          tone: 'success',
        })
      }
    >
      Show toast
    </Button>
  )
}

export function ToastDocPage() {
  return (
    <>
      <Text tone="muted">Toast provides transient notifications for feedback and non-blocking alerts.</Text>
      <Section title="Examples">
        <Example
          title="Toast Provider"
          code={`<ToastProvider>\n  <ToastDemo />\n</ToastProvider>`}
        >
          <Column>
            <ToastProvider>
              <ToastDemo />
            </ToastProvider>
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'title', type: 'string', defaultValue: 'undefined', description: 'Toast title text.' },
          { prop: 'description', type: 'string', defaultValue: 'undefined', description: 'Toast body text.' },
          { prop: 'tone', type: '"default" | "success" | "error" | "warning"', defaultValue: '"default"', description: 'Visual tone and default icon.' },
          { prop: 'duration', type: 'number', defaultValue: '3200', description: 'Auto-dismiss timeout in ms.' },
        ]} />
      </Section>
    </>
  )
}
