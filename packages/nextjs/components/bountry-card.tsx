import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, X } from "lucide-react";

export default function BountyCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer max-w-sm rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative h-48 w-full">
            <Image
              src="https://unsplash.com/photos/an-aerial-view-of-a-city-at-night-kMl4FSGXQRo"
              alt="Product Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Click to view details
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Amazing Product</DialogTitle>
          <DialogDescription>Discover the features of our amazing product.</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video">
          <Image src="/placeholder.svg" alt="Product Image" fill className="rounded-lg object-cover" />
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Bounty Details</h4>
          <p className="mt-2">{description}</p>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <div>
            <Button variant="outline" className="mr-2">
              Add to Cart
            </Button>
            <Button>Buy Now</Button>
          </div>
        </DialogFooter>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
