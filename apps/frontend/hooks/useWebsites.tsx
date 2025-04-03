"use client";
import { API_BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Website } from "@/types/website";

// what is this useWebsites Hook doing?
/* 
       - When a user hits a dashboard page
       - I need to get his websites uptime's from the be
       - TO do This I defined a custom hook called useWebsites
            -Which does 2 things
                # creates a state var websites to store and persist the data given from be
                # basic usertoken passing in Authorization headers by callin' getToken() fn
                # simple useEffect for calling the get fn every 1 min as the validators will be continuously sending the uptimeTicks for each website 
*/

export function useWebsites() {
    const { getToken } = useAuth(); // instead of getting from local Storage(JWT'S), we are gettin a user token from a hook written by clerk
    const [websites, setWebsites] = useState<Website[]>([]);

    async function refreshWebsites() {    
        const token = await getToken(); // A function that retrieves the current user's session token 
        const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
            headers: {
                Authorization: token,
            },
        });

        setWebsites(response.data.websites);
    }

    useEffect(() => {
        refreshWebsites();

        const interval = setInterval(() => {
            refreshWebsites();
        }, 1000 * 60 * 1);

        return () => clearInterval(interval);
    }, []);

    return { websites, refreshWebsites };

}