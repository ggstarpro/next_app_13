import React from 'react'
import Image from "next/image";
import { getDetailArticle } from '@/blogAPI';
import DeleteButton from '@/app/components/DeleteButton';

const Article = async ({params}: {params: {id: string}}) => {
  // console.log(params.id)
  /** json server */
  // const detailArticle = await getDetailArticle(params.id)

  /**  supabase (ISR) */
  const API_URL= process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${API_URL}/api/blog/${params.id}`, {
    next: {
      revalidate: 10,
    }
  })
  const detailArticle = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* relative を追加 */}
      <Image
        src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${detailArticle.id}`}
        width={1280}
        height={300}
        alt=""
      />
      <h1 className="text-4xl text-center mb-10 mt-10">
        {detailArticle.title}
      </h1>
      <div className="text-lg leading-relaxed text-justify">
        <p>{detailArticle.content}</p>
      </div>
      <div className="text-right mt-3">
        <DeleteButton id={detailArticle.id} />
      </div>
    </div>
  )
}

export default Article