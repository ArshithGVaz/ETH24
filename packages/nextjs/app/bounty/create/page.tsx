"use client";

import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import { z } from "zod";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

// eslint-disable-next-line react-hooks/rules-of-hooks

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  requirements: z.string().min(20, {
    message: "Requirements must be at least 20 characters long",
  }),
  //   image: z.string().url({
  //     message: "Image must be a valid URL",
  //   }),
  amount: z.string().min(1),
  deadline: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Deadline must be a valid date",
  }),
  host: z.string().min(10, {
    message: "Enter valid address",
  }),
});

const BountyCreate = () => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("BountyContract");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      requirements: "",
      //   image: "",
      amount: "",
      deadline: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await writeYourContractAsync({
        functionName: "createBounty",
        args: [values.title, values.requirements, parseEther(values.amount)],
        //   value: parseEther("0.1"),
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Travel Bounty</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your bounty title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Requirements" {...field} />
                  </FormControl>
                  <FormDescription>Provide more requirements about the bounty.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" />
                  </FormControl>
                  <FormDescription>Submit the images.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Amount" {...field} />
                  </FormControl>
                  <FormDescription>Enter total amount of the bounty.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Date of deadline" {...field} />
                  </FormControl>
                  <FormDescription>Enter deadline for the bounty.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BountyCreate;
