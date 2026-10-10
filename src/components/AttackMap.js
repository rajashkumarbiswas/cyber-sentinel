"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TARGET } from "@/lib/data";

export default function AttackMap({ attacks }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const seen = useRef(new Set());

  // map তৈরি
  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map(elRef.current, {
      center: [28, 40],
      zoom: 2,
      minZoom: 2,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd" }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);

    L.marker([TARGET.lat, TARGET.lng], {
      icon: L.divIcon({ className: "", html: '<div class="target-ring"></div>', iconSize: [24, 24], iconAnchor: [12, 12] }),
    }).addTo(map);

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // নতুন attack এলে লাইন + পালস মার্কার
  useEffect(() => {
    const a = attacks[0];
    const layer = layerRef.current;
    if (!a || !layer || seen.current.has(a.id)) return;
    seen.current.add(a.id);

    const line = L.polyline(
      [[a.lat, a.lng], [TARGET.lat, TARGET.lng]],
      { color: a.color, weight: 1.6, opacity: 0.85, dashArray: "6 8", className: "attack-line" }
    );
    const dot = L.marker([a.lat, a.lng], {
      icon: L.divIcon({
        className: "",
        html: `<div class="pulse-dot" style="--c:${a.color}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    });
    line.addTo(layer);
    dot.addTo(layer);

    const t = setTimeout(() => {
      layer.removeLayer(line);
      layer.removeLayer(dot);
    }, 4000);
    return () => clearTimeout(t);
  }, [attacks]);

  return <div ref={elRef} className="h-full w-full" />;
}