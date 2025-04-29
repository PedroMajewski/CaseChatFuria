"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import { CircleIcon } from "lucide-react";

export default function LiveorCarousel(){

  const [isLiveNow,setIsLiveNow] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);

  //Função Simulada de Testes com LIVE
  useEffect(() => {
    const simulateLiveStatus = () => {
      const isLive = Math.random() > 0.5; 
      if (isLive) {
        // Simula que está passando uma live
        setIsLiveNow(true);
        setLiveVideoId("OWoG6XMiU8g"); 
      } else {
        // Simula que não tem live
        setLiveVideoId(null);
      }
    };

    simulateLiveStatus();
  }, []);
    
    return(   
      <>  
        {isLiveNow ? (
          <>
          <div className="flex align-center justify-between">
            <h2 className="font-bold max-w-80 uppercase md:text-2xl md:max-w-full">Ao Vivo - NAVI vs. FURIA - IEM KATOWICE 2025</h2>
            <CircleIcon color="red"/>
          </div>
            <div className="w-full h-[75vh] flex justify-center items-center">
                  <iframe
                    className="rounded-lg w-full h-full"
                    src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
                    title="Live Furia"
                    allowFullScreen
                  ></iframe>
            </div>
          </>
            ) : (
                  <Carousel opts={{
            loop:true}}>
            <CarouselContent>
                <CarouselItem className="flex items-center justify-center overflow-hidden w-full"><img className="rounded-sm h-[75vh] md:h-full w-full object-cover" src="https://furiagg.fbitsstatic.net/img/b/1be4afd5-a727-4555-81fd-e779a32578be.jpg?w=1920&v=no-change" alt="Furia" /></CarouselItem>
                <CarouselItem><img src="" alt="" /></CarouselItem>
                <CarouselItem><img src="" alt="" /></CarouselItem>
            </CarouselContent>
        </Carousel>
                )}
      </>
    )
    
}