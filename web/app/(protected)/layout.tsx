import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
   const session = await auth.api.getSession({
        headers: await headers()
    })
    // console.log(session)
    if(!session) {
        redirect("/")
    }
 

  return <>{children}</>;
}
