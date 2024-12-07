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
import { X } from "lucide-react";

export default function BountyCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Image
            src="/placeholder.svg"
            alt="Product Image"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
          <h3 className="mt-2 text-lg font-semibold">Amazing Product</h3>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Amazing Product</DialogTitle>
          <DialogDescription>Discover the features of our amazing product.</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video">
          <Image src="/placeholder.svg" alt="Product Image" fill className="rounded-lg object-cover" />
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Product Details</h4>
          <p className="mt-2">
            This amazing product is designed to revolutionize your daily life. It comes with cutting-edge features that
            will enhance your productivity and bring joy to your everyday tasks. Made with high quality materials,
            it&apos;s built to last and perform consistently.
          </p>
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
