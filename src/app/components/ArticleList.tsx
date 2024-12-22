import React from "react";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";

type ArticleListProps = {
  articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}

    </div>
  );
};

export default ArticleList;