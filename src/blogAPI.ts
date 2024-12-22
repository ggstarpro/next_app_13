import { resolve } from "path/posix";
import { notFound } from "../node_modules/next/navigation";
import { Article } from "./types";

const endPoint = 'http://localhost:3999/posts'

export const getAllArticles = async (): Promise<Article[]> => {
  // [SSR](https://nextjs.org/docs/app/api-reference/functions/fetch)
  const resSSR = await fetch(`${endPoint}`, {cache: "no-store"})

  // SSG
  const resSSG = await fetch(`${endPoint}`, {cache: "force-cache"})
  // ISR
  const resISR = await fetch(`${endPoint}`, { next: { revalidate: 10 } })

  // .jsonでシリアライズ(文字列化)
  const articles = await resSSR.json();


  // error.tsxの確認
  // throw new Error("Hello")

  if (!resSSR.ok) {
    throw new Error("エラーが発生しました")
  }

  // 意図的にローディングを発生させる
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return articles;
}

export const getDetailArticle = async (id: string): Promise<Article> => {
    const res = await fetch(`${endPoint}/${id}`, {next: {revalidate: 60}}) // 60s
    if (res.status === 404) {
      notFound()
    }

    if (!res.ok) {
      throw new Error("エラーが発生しました")
    }
    const article = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return article
}


export const createArticle = async (
  id: string,
  title: string,
  content: string
): Promise<Article> => {
  const currentDateTime = new Date().toISOString();
  const res = await fetch(`${endPoint}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      content,
      currentDateTime,
    })
  })


  if (!res.ok) {
    throw new Error("エラーが発生しました")
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newArticle = await res.json();
  return newArticle
}

export const deleteArticle = async (
  id: string,
): Promise<Article> => {
  const res = await fetch(`${endPoint}/${id}`, {
    method: 'DELETE',
  })


  if (!res.ok) {
    throw new Error("エラーが発生しました")
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const deleteArticle = await res.json();
  return deleteArticle
}