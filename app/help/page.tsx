'use client'

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ResourceCard } from "../../components/Cards";

function WelcomeMessage({ viewer }: { viewer: string | null }) {
  return <p>Welcome {viewer ?? "Anonymous"}!</p>;
}

function AddNumberButton({ addNumber }: { addNumber: (arg: { value: number }) => void }) {
  return (
    <button
      className="bg-foreground text-background text-sm px-4 py-2 rounded-md"
      onClick={() => {
        void addNumber({ value: Math.floor(Math.random() * 10) });
      }}
    >
      Add a random number
    </button>
  );
}

function NumbersList({ numbers }: { numbers: number[] | undefined }) {
  return (
    <p>
      Numbers: {numbers?.length === 0 ? "Click the button!" : (numbers?.join(", ") ?? "...")}
    </p>
  );
}

function UsefulResources() {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold">Useful resources:</p>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <ResourceCard
            title="Convex docs"
            description="Read comprehensive documentation for all Convex features."
            href="https://docs.convex.dev/home"
          />
          <ResourceCard
            title="Stack articles"
            description="Learn about best practices, use cases, and more from a growing\ncollection of articles, videos, and walkthroughs."
            href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <ResourceCard
            title="Templates"
            description="Browse our collection of templates to get started quickly."
            href="https://www.convex.dev/templates"
          />
          <ResourceCard
            title="Discord"
            description="Join our developer community to ask questions, trade tips & tricks,\nand show off your projects."
            href="https://www.convex.dev/community"
          />
        </div>
      </div>
    </div>
  );
}

function EditInstructions() {
  return (
    <>
      <p>
        Edit <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">convex/myFunctions.ts</code> to change your backend
      </p>
      <p>
        Edit <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">app/page.tsx</code> to change your frontend
      </p>
    </>
  );
}

export default function Help() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto p-8">
      <WelcomeMessage viewer={viewer} />
      <AddNumberButton addNumber={addNumber} />
      <NumbersList numbers={numbers} />
      <p>
        See the{" "}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </p>
      <EditInstructions />
      <UsefulResources />
    </div>
  );
}
