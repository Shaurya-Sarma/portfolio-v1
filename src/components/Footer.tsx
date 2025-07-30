import SocialButtonBar from "./SocialButtonBar";

export default function Footer() {
  return (
    <footer
      className="
        w-full max-w-screen-xl mx-auto px-4 py-6
        flex flex-col items-center text-center gap-2
      "
    >
      {/* Social Button Bar - always above */}
      <div className="mb-2">
        <SocialButtonBar />
      </div>

      {/* Footer Text */}
      <div className="text-sm font-medium text-gray-500">
        all work made by © {new Date().getFullYear()} Shaurya Sarma
      </div>
    </footer>
  );
}
