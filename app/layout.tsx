import './globals.css'

export const metadata = {
  title: 'Workflow Replay | TAI Labs',
  description: 'Turn AI-assisted workflows into measurable business outcomes.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
