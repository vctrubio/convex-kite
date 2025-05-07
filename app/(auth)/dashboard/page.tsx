'use client'

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function StudentList() {
  const students = useQuery(api.myFunctions.listStudents, {});
  const fields = [
    { key: "height", label: "Height", type: "number", min: 0 },
    { key: "weight", label: "Weight", type: "number", min: 0 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md">
      <h2 className="text-xl font-bold">Students</h2>
      <ul className="mt-2">
        {students?.length === 0 && <li>No students yet.</li>}
        {students?.map((student: any) => (
          <li key={student._id} className="border-b py-1 text-sm">
            {fields.map(field => (
              <span key={field.key} className="mr-4">
                {field.label}: {student[field.key]}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-8">
      <StudentList />
    </main>
  );
}



