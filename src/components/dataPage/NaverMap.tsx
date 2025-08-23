import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

type Center = {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  phone?: string;
};

type NaverMapProps = {
  data: Center[];
  center?: { lat: number; lng: number };
  zoom?: number;
};

const NaverMap: React.FC<NaverMapProps> = ({ data, center, zoom }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const tryInitializeMap = () => {
      if (!window.naver?.maps || !mapElement.current) {
        setTimeout(tryInitializeMap, 100);
        return;
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(
          center?.lat || 36.3504,
          center?.lng || 127.3845
        ),
        zoom: zoom || 7,
      };

      const map = new window.naver.maps.Map(mapElement.current, mapOptions);
      mapInstanceRef.current = map;

      data.forEach((center) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(center.lat, center.lng),
          map: map,
        });

        const infoWindowContent = `
      <div style="padding: 10px; line-height: 1.5; background: white; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
        <b style="font-size: 14px;">${center.name}</b><br>
        주소: ${center.address || ""}<br>
        전화번호: ${center.phone || ""}
      </div>
    `;

        const infoWindow = new window.naver.maps.InfoWindow({
          content: infoWindowContent,
          borderWidth: 0,
          backgroundColor: "transparent",
          disableAnchor: true,
        });

        window.naver.maps.Event.addListener(
          marker,
          "click",
          function (_e: naver.maps.PointerEvent) {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          }
        );
      });
    };

    tryInitializeMap();
  }, [data]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && center && zoom) {
      map.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
      map.setZoom(zoom);
    }
  }, [center, zoom]);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
