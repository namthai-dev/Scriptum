'use client';

import { useState } from 'react';

import type { getDictionary } from '@/features/internationalization/get-dictionaries';

export function Counter({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['counter'];
}) {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center bg-red-100 w-fit m-auto p-2'>
      This component is rendered on the client:
      <button onClick={() => setCount(n => n - 1)}>
        {dictionary.decrement}
      </button>
      {count}
      <button onClick={() => setCount(n => n + 1)}>
        {dictionary.increment}
      </button>
    </div>
  );
}