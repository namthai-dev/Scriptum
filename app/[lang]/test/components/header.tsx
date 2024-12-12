'use client'

import React from 'react'
import Link from 'next/link';

import { useSwitchLocaleHref } from '@/hooks/use-switch-locale';

export default function Header() {
    const getSwitchLocaleHref = useSwitchLocaleHref()

    return (
        <div className='h-10 bg-red-300 flex justify-between items-center px-4'>
            <p>Logo</p>
            <ul className='flex gap-2'>
                <Link href={getSwitchLocaleHref("vi-VN")}>vi-VN</Link>
                <Link href={getSwitchLocaleHref("en-US")}>en-US</Link>
            </ul>
        </div>
    )
}
