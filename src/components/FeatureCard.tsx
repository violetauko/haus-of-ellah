import Image from "next/image";


export default function FeatureCard() {
  return (
    <div className="flex items-center justify-center space-x-2 bg-stone-50 backdrop-blur-xl rounded-3xl p-2 border border-white/30 shadow-2xl">
      <div className="w-full h-32 bg-linear-to-br from-yellow-100/40 to-yellow-200/40 rounded-lg flex items-center justify-center border border-white/20">
        <div className="text-center">
          <Image
            src="/images/E2.jpeg"
            alt="Feature Card Image"
            width={140}
            height={80}
            className="object-contain mx-auto"
          />
        </div>
      </div>

      {/* Card Content */}
      <div>
      <h3 className="text-black font-semibold text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Beautiful In Every Detail
      </h3>
      <p className="text-gray-900 text-xs mb-2 leading-relaxed font-light">
        Crafted with precision and elegance, each piece tells a story of luxury and sophistication.
      </p>

      {/* Read More Link */}
      <a href="#" className="text-gray-700 text-xs font-semibold flex items-center gap-2 hover:gap-3 transition group">
        Read More
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
      </div>
    </div>
  );
}
