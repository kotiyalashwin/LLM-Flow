'use client'
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export const AuthButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <>
      <Button
        variant="default"
        size="sm"
        className="group bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
        onClick={async()=> await authClient.signIn.social({
          provider : "google",
          callbackURL : "/workflow",
          // errorCallbackURL : "/",
          fetchOptions:{
            onError: ()=>{
              router.push('/')
            }
          }
        })
         }
      >
        {children}
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </>
  );
};
