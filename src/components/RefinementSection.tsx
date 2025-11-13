
import Image from 'next/image';

export default function RefinementSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Left Image - Portrait with Rating */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-xs">
              {/* Star Rating Badge */}
              <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                </div>
                <p className="text-white text-sm font-semibold">(5/5)</p>
              </div>
              {/* Image Container */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/woman.jpeg"
                  alt="The Art Of Radiant Refinement"
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Center Content - Text and CTA */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Art Of Radiant<br />Refinement
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8 font-light">
              Every pair of earrings in our collection is crafted to capture attention and elevate your style. From delicate studs that whisper elegance to statement pieces that command the room, we believe in the transformative power of the perfect accessory. Each design is thoughtfully created to complement your natural beauty and express your unique personality, because true refinement lies in the details that make you shine.
            </p>
          </div>
          
          {/* Right Image - Product Shot */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://i.pinimg.com/1200x/e3/09/0e/e3090e4a415951f00954f6794ad69670.jpg"
                alt="Jewelry Collection"
                width={300}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}