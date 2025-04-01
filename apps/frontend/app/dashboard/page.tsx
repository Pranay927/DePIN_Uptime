"use client";
import { useState, useMemo } from "react";
import { Globe, Plus } from "lucide-react";
import { useWebsites } from "@/hooks/useWebsites";
import axios from "axios";
import { API_BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CreateWebsiteModal } from "@/components/CreateWebsiteModal";
import { WebsiteCard } from "@/components/WebsiteCard";
import { processWebsites} from "@/app/utils/processWebsites"; // Process logic in utils
import { useCreateWebsiteModal } from "@/hooks/useCreateWebsiteModal"; // Custom modal hook

function App() {
  const { websites, refreshWebsites } = useWebsites(); // Custom hook for fetching websites
  const { getToken } = useAuth();
  const { isModalOpen, openModal, closeModal } = useCreateWebsiteModal(); // Modal management

  // Process websites
  const processedWebsites = useMemo(() => processWebsites(websites), [websites]);

  const handleCreateWebsite = async (url: string | null) => {
    if (url === null) {
      closeModal();
      return;
    }

    const token = await getToken();
    console.log(token)
    closeModal();

    axios.post(
        `${API_BACKEND_URL}/api/v1/website`,
        { url },
        { headers: { Authorization: token } }
      )
      .then(() => {
        refreshWebsites();
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Uptime Monitor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={openModal}>
              <Plus className="w-4 h-4" />
              <span>Add Website</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {processedWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </div>

      <CreateWebsiteModal
        isOpen={isModalOpen}
        onClose={handleCreateWebsite}
      />
    </div>
  );
}

export default App;
