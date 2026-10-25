'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppContact } from '@/lib/analytics';

interface WhatsAppButtonProps {
  url: string;
  productName?: string;
  price?: string | number;
  source?: 'product_detail' | 'navbar' | 'hero' | 'footer';
  className?: string;
  label?: string;
}

export function WhatsAppButton({
  url,
  productName,
  price,
  source = 'product_detail',
  className = 'flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all',
  label = 'Pedir por WhatsApp',
}: WhatsAppButtonProps) {
  const handleClick = () => {
    trackWhatsAppContact({
      productName,
      price,
      source,
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      <MessageCircle className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
}
