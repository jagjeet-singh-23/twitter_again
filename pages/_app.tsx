import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
import LoginModal from '@/components/Modal/LoginModal'
import RegisterModal from '@/components/Modal/RegisterModal'
import EditModal from '@/components/Modal/EditModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <EditModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
