export const ExtendedButton = ({ title, link }) => (
  <a
    href={link}
    className="inline-block text-white font-medium text-base px-7 rounded-full shadow-sm transition-all no-underline mxp-extended-button"
  >
    {title}
  </a>
);
