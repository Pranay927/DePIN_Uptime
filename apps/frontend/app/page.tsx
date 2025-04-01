'use client'
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export default function Home() {
  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth()
  const router  = useRouter()
  return (
    <div className="flex flex-col justify-center items-center gap-2 font-mono h-screen">
      
      <div className="">Uptime Depin </div>
      <Button onClick={()=>{
        if(isSignedIn){
          router.push('/dashboard');
        }
        
      }} >Start Monitoring</Button>
    </div>
  );
}
