'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <ol className="list-decimal list-inside">
        {tasks?.map(({ _id, text }) => <li key={_id}>{text}</li>)}
      </ol>
    </main>
  );
}