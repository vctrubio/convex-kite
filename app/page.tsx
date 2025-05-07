'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-8 items-center">
      <div className="max-w-xl w-full flex flex-col items-center gap-6 p-8">
        <h1 className="text-2xl font-bold text-center">Welcome to Kite Management 101</h1>
        <div className="w-full flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">How Lessons Work</h2>
          <ul className="mt-2 text-base text-gray-800 list-disc list-inside">
            <li>Each <b>Lesson</b> has one or more <b>Students</b> and one or more <b>Teachers</b>.</li>
            <li>Lessons have a <b>time</b> and <b>date</b>.</li>
            <li>Lessons have a <b>confirmationLesson</b> (confirmation status or object).</li>
            <li>Lessons have a <b>sessionId</b> and <b>bookingId</b>.</li>
          </ul>
          <Link
            href="/dashboard"
            className="mt-6 text-blue-600 hover:underline font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}



