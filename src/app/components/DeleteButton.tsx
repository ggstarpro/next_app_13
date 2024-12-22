// onChangeはclientcoponentでないと使用できず、出来るだけserver componentを使用したいのでコンポーネント切り出し
"use client";

import { deleteArticle } from "@/blogAPI";
// import { deleteArticle } from "@/pages/api/articles/articles";
import { useRouter } from "next/navigation";
import React from "react";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    /** json server */
    // await deleteArticle(id)

    /**  supabase */
    const API_URL= process.env.NEXT_PUBLIC_API_URL
    await fetch(`${API_URL}/api/blog/${id}`, {
      method: "DELETE",
    })

    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-5 inline coursor-pointer"
    >
      削除
    </button>
  );
};

export default DeleteButton;