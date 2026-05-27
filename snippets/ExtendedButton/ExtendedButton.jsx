export const ExtendedButton = ({ title, link }) => (
  <a
    href={link}
    className="inline-block text-white font-medium text-base px-7 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all bg-gradient-to-b from-[#9b7eff] to-[#7856ff] active:to-[#5028C0] no-underline"
  >
    {title}
  </a>
);
