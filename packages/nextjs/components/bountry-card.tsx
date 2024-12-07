import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function BountyCard({ data }: { data: { [key: string]: any } }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    console.log("open");
    router.push(`/bounty/upload/${data.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer w-full  py-4 px-6  rounded-xl border border-slate-600 bg-black shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative h-48 w-full">
            <Image
              src="https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product Image"
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="py-5">
            <h3 className="text-xl mb-3 font-semibold text-gray-100">{data.name}</h3>
            <Button
              // variant="primary"
              className="inline-flex items-center rounded bg-black px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Click to view details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          {/* <DialogDescription>Discover the features of our amazing product.</DialogDescription> */}
        </DialogHeader>
        <div className="relative aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product Image"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Bounty Details</h4>
          <p className="mt-2">{data.requirements}</p>
          <p className="mt-2">Prize pool:{data.amount}</p>
          <p className="mt-2">Deadline:{data.deadline}</p>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <div>
            <Button onClick={handleSubmit}>Apply for Bounty</Button>
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
