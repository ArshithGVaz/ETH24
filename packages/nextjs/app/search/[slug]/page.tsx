"use client";

import Image from "next/image";
import akave, { Akave } from "~~/storage/akave";
import { FollowerPointerCard } from "~~/~/components/ui/following-pointer";

const Card = ({ title, author, date, description, image, authorAvatar }: any) => (
  <FollowerPointerCard title={<TitleComponent title={blogContent.author} avatar={blogContent.authorAvatar} />}>
    <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
      <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
        <Image
          src={"/thumbnail.jpg"}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold my-4 text-lg text-zinc-700">{blogContent.title}</h2>
        <h2 className="font-normal my-4 text-sm text-zinc-500">{blogContent.description}</h2>
        <div className="flex flex-row justify-between items-center mt-10">
          <span className="text-sm text-gray-500">{blogContent.date}</span>
          <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
            Read More
          </div>
        </div>
      </div>
    </div>
  </FollowerPointerCard>
);

const getImages = async () => {
  const image = await akave.getAllFileURLs("akatsuki");
  console.log(image);
  return image;
};

export default function Page({ params: { slug } }: { params: { slug: string } }) {
  const formattedSlug = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const images = getImages();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">Most Popular Place in {formattedSlug}</h1>
      <div className="max-w-md mx-auto">
        <Card {...blogContent} />
      </div>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/thumbnail.jpg",
  authorAvatar: "/thumbnail.jpg",
};

const TitleComponent = ({ title, avatar }: { title: string; avatar: string }) => (
  <div className="flex space-x-2 items-center">
    <Image src={avatar} height={20} width={20} alt="thumbnail" className="rounded-full border-2 border-white" />
    <p>{title}</p>
  </div>
);
