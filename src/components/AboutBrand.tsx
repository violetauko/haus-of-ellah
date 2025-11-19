import React from 'react';

export default function AboutSection() {
  return (
    <section id='about' className="relative bg-gradient-to-b from-stone-100 to-white overflow-hidden">
       <div className="mt-5 mb-2 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-light text-slate-800 mb-4">
            Handcrafted for Your Unique Style
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Each piece in our collection is thoughtfully designed to complement your individuality. 
            From delicate studs to bold statement pieces, discover earrings that tell your story.
          </p>
        </div>
      <div className="mx-auto">
        
        {/* Main collage layout */}
        <div className="relative h-[100px] sm:h-[800px] mx-auto max-w-5xl">
          
          {/* Left image - positioned higher, behind card */}
          <div className="absolute top-0 left-0 w-[300px] sm:w-[380px] h-[100px] sm:h-[500px] overflow-hidden shadow-2xl z-0">
            <img 
              src="https://i.pinimg.com/1200x/7e/71/cc/7e71cce2f346e2c42995839f68dbf22d.jpg" 
              alt="Elegant gold earrings"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Center card - overlapping both images, on top */}
          <div className="absolute top-[100px] sm:top-[120px] left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] bg-[#301E0B] text-white p-8 sm:p-10 shadow-2xl z-30">
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-slate-300">
              WHERE ELEGANCE MEETS ARTISTRY
            </p>
            <h2 className="text-3xl sm:text-4xl font-light mb-5 leading-tight">
              The earring collection your elegance needs.
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 mb-8">
              Through meticulous design and the perfect combination of timeless and statement pieces, I create earrings that let you express who you are while adding that perfect sparkle to your look. More subscribers, more sales, more beauty.
            </p>
          </div>
          
          {/* Right image - positioned lower, behind card */}
          <div className="absolute top-[180px] sm:top-[220px] right-0 w-[300px] sm:w-[380px] h-[100px] sm:h-[500px] overflow-hidden shadow-2xl z-0">
            <img 
              src="https://i.pinimg.com/1200x/02/29/e7/0229e76c5bdf8b65e5f5b42b23c05a16.jpg" 
              alt="Woman wearing statement earrings"
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>

        {/* Bottom section with additional info */}
       
      </div>
    </section>
  );
}