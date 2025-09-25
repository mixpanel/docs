import { ReactNode } from 'react'
import { Layout } from 'nextra-theme-docs'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Layout>
      {children}  
    </Layout>
  )
}