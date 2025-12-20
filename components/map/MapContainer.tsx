"use client";

import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Spot } from "@/types/chat";

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapContainerProps {
    spots: Spot[];
}

export default function MapContainer({ spots }: MapContainerProps) {
    const mapRef = useRef<HTMLElement>(null);
    const [map, setMap] = useState<any>(null);
    const markersRef = useRef<any[]>([]);
    const activeOverlayRef = useRef<any>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const loadMap = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = mapRef.current;
                    const options = {
                        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                        level: 3,
                    };
                    const createdMap = new window.kakao.maps.Map(container, options);
                    setMap(createdMap);

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const lat = position.coords.latitude;
                                const lon = position.coords.longitude;
                                const locPosition = new window.kakao.maps.LatLng(lat, lon);

                                createdMap.setCenter(locPosition);



                            },
                            (err) => {
                                console.error("GeoLocation Error:", err);
                            }
                        );
                    }
                });
            }
        };

        if (window.kakao && window.kakao.maps) {
            loadMap();
        }
    }, []);

    useEffect(() => {
        if (!map || !window.kakao) return;

        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        if (activeOverlayRef.current) {
            activeOverlayRef.current.setMap(null);
            activeOverlayRef.current = null;
        }

        if (spots.length > 0) {
            const bounds = new window.kakao.maps.LatLngBounds();

            spots.forEach((spot) => {
                const markerPosition = new window.kakao.maps.LatLng(spot.latitude, spot.longitude);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    title: spot.name,
                });
                marker.setMap(map);
                markersRef.current.push(marker);
                bounds.extend(markerPosition);

                const overlayJsx = (
                    <div className="relative bg-white rounded-xl shadow-xl border border-gray-100 p-4 min-w-[200px] transform transition-all">
                        {/* Arrow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-gray-100" />

                        {/* Title */}
                        <div className="font-bold text-gray-900 mb-2 pr-6 truncate">
                            {spot.name}
                        </div>

                        {/* Link */}
                        <a
                            href={`https://map.kakao.com/link/search/${spot.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
                        >
                            <span>카카오맵에서 보기</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>

                        {/* Close Button */}
                        <button className="close-btn absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                );

                const content = document.createElement('div');
                content.innerHTML = renderToStaticMarkup(overlayJsx);

                const overlay = new window.kakao.maps.CustomOverlay({
                    content: content,
                    map: null,
                    position: markerPosition,
                    yAnchor: 1.35,
                    zIndex: 3
                });

                const closeBtn = content.querySelector('.close-btn');
                if (closeBtn) {
                    closeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        overlay.setMap(null);
                        activeOverlayRef.current = null;
                    });
                }

                window.kakao.maps.event.addListener(marker, 'click', () => {
                    if (activeOverlayRef.current) {
                        activeOverlayRef.current.setMap(null);
                    }
                    overlay.setMap(map);
                    activeOverlayRef.current = overlay;

                    map.panTo(markerPosition);
                });
            });


            map.setBounds(bounds);
        }
    }, [map, spots]);

    return (
        <div className="w-full h-full relative group">
            <div ref={mapRef as any} className="w-full h-full bg-gray-50" />
        </div>
    );
}
