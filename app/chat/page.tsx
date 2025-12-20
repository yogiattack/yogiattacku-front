"use client";

import { useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import MapContainer from "@/components/map/MapContainer";
import { Spot } from "@/types/chat";

export default function ChatPage() {
    const [spots, setSpots] = useState<Spot[]>([]);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative z-0">
                <MapContainer spots={spots} />
            </div>
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full z-10">
                <ChatInterface onSpotsReceived={setSpots} />
            </div>
        </div>
    );
}
