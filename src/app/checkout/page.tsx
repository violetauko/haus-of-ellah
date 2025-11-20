// app/checkout/page.tsx

'use client';
import { useCart } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MessageCircle, Download, ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [downloadingImages, setDownloadingImages] = useState(false);
  
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);
  
  if (items.length === 0) {
    return null;
  }
  
  const downloadProductImages = async () => {
    setDownloadingImages(true);
    
    try {
      for (const item of items) {
        // Fetch the image
        const response = await fetch(item.imageUrl);
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.name.replace(/[^a-z0-9]/gi, '-')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      alert('Images downloaded! You can now attach them to WhatsApp.');
    } catch (error) {
      console.error('Error downloading images:', error);
      alert('Failed to download some images. Please try again.');
    } finally {
      setDownloadingImages(false);
    }
  };
  
  const handleWhatsAppOrder = () => {
    let whatsappNumber = '254728636956' // Replace with your business WhatsApp number
    
    whatsappNumber = whatsappNumber.replace(/[\s\-+]/g, '');
    
    if (whatsappNumber.startsWith('0')) {
      whatsappNumber = '254' + whatsappNumber.substring(1);
    }
    
    if (!whatsappNumber.startsWith('254')) {
      whatsappNumber = '254' + whatsappNumber;
    }
    
    const orderDetails = items.map((item, index) => 
      `*${index + 1}. ${item.name}*%0A` +
      `   Price: KSh ${item.price.toLocaleString()}%0A` +
      `   Quantity: ${item.quantity}%0A` +
      `   Subtotal: KSh ${(item.price * item.quantity).toLocaleString()}%0A` +
      `   Image: ${item.imageUrl}`
    ).join('%0A%0A');
    
    const total = getTotal();
    
    const message = `Hello! I would like to place an order:%0A%0A${orderDetails}%0A%0A━━━━━━━━━━━━━━━━━━%0A*TOTAL: KSh ${total.toLocaleString()}*%0A━━━━━━━━━━━━━━━━━━%0A%0APlease confirm availability and delivery details. Thank you!`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 1000);
  };
  
  const handleOrderWithImages = async () => {
    // First download images
    await downloadProductImages();
    
    // Then open WhatsApp after a short delay
    setTimeout(() => {
      alert('Now opening WhatsApp. Please attach the downloaded images to your message.');
      handleWhatsAppOrder();
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-stone-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Checkout</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-amber-100">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-amber-900">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-amber-700 font-semibold">
                    KSh {item.price.toLocaleString()} each
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-amber-900">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-amber-200 pt-4">
            <div className="flex justify-between text-xl font-bold text-amber-900">
              <span>Total</span>
              <span>KSh {getTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
            
            {/* Option 2: Text Only */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#301E0B] text-white py-4 rounded-lg font-bold hover:bg-amber-800 transition flex items-center justify-center space-x-3"
            >
              <MessageCircle size={24} />
              <span>Place Order </span>
            </button>
      </div>
    </div>
  );
}