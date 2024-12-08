"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import akave from "~~/storage/akave";
import { FollowerPointerCard } from "~~/~/components/ui/following-pointer";

const Card = ({ title, author, date, description, image, authorAvatar }: any) => (
  <FollowerPointerCard title={<TitleComponent title={author} avatar={authorAvatar} />}>
    <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
      <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
        <Image
          src={image}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 `}
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold my-4 text-lg text-zinc-700">{title}</h2>
        <h2 className="font-normal my-4 text-sm text-zinc-500">{description}</h2>
        <div className="flex flex-row justify-between items-center mt-10">
          <span className="text-sm text-gray-500">{date}</span>
          <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
            Read More
          </div>
        </div>
      </div>
    </div>
  </FollowerPointerCard>
);

const getImages = async () => {
  const images = await akave.getAllFileURLs("akatsuki");
  return images;
};

export default function Page({ params: { slug } }: { params: { slug: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const formattedSlug = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await getImages();
      setImages(fetchedImages);
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">Most Popular Place in {formattedSlug}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card
            key={index}
            title={`Image ${index + 1}`}
            author={blogContent.author}
            date={blogContent.date}
            description={blogContent.description}
            image={image}
            authorAvatar={blogContent.authorAvatar}
          />
        ))}
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
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcss grid and React.",
  image: "",
  authorAvatar:
    "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const TitleComponent = ({ title, avatar }: { title: string; avatar: string }) => (
  <div className="flex space-x-2 items-center">
    <Image src={avatar} height={20} width={20} alt="thumbnail" className="rounded-full border-2 border-white" />
    <p>{title}</p>
  </div>
);
