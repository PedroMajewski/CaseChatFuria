"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import { CircleIcon, MessageSquare } from "lucide-react";
import { FC } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ChatInterface from "./chat-interface";
import LastMatchesTable from "../LastMatchesTable";

interface LiveorCarouselProps {
  isLive: boolean;
  liveId: string;
}


const LiveorCarousel: FC<LiveorCarouselProps> = ({ isLive, liveId }) => {
  return (
    <>
      {isLive ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold max-w-80 uppercase md:text-2xl md:max-w-full">
              Ao Vivo - NAVI vs. FURIA - IEM KATOWICE 2025
            </h2>
            <CircleIcon color="red" />
          </div>
  
          <section className="flex flex-col lg:flex-row gap-4">
            {/* Vídeo ao vivo */}
            <div className="w-full lg:w-3/4 h-[60vh] lg:h-[75vh] flex justify-center items-center">
              <iframe
                className="rounded-lg w-full h-full"
                src={`https://www.youtube.com/embed/${liveId}?autoplay=1?t=1660`}
                title="Live Furia"
                allowFullScreen
              ></iframe>
            </div>
  
            {/* Chat ao lado */}
            <div className="w-full lg:w-2/4 h-[80vh] lg:h-[75vh] flex flex-col">
              <div className="bg-background border rounded-lg shadow-md flex-1 overflow-hidden">
                <div className="p-2 font-semibold border-b text-center">Clutch Chat!</div>
                <div className="h-full  overflow-y-auto px-2 py-1">
                  <ChatInterface chatRoomId="mYeQg8DNSeuHthDTKKzd" />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <LastMatchesTable />
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center overflow-hidden w-full">
              <img
                className="rounded-sm h-[75vh] md:h-full w-full object-cover"
                src="https://furiagg.fbitsstatic.net/img/b/1be4afd5-a727-4555-81fd-e779a32578be.jpg?w=1920&v=no-change"
                alt="Furia"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      )}
    </>
  );

}

export default LiveorCarousel;