import Head from "next/head"
import { NextPage } from "next"
import Header from "@/components/Header"
import Form from "@/components/Form"
import PostFeed from "@/components/posts/PostFeed"

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Again - Home</title>
        <meta name="twitter again" content="To gather all the spilled curd by Elon Musk" />
      </Head>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
