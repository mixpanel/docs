export default function FAQBox({ title, children }) {
    return (
      <details
        open={false}
        className="last-of-type:mb-0 rounded-xl bg-[#f5f2f2] dark:bg-neutral-800 p-0 mt-6"
      >
        <summary>
          <strong className="text-lg font-medium text-[#1b0b3b]">{title}</strong>
        </summary>
        <div className="nx-p-2">{children}</div>
      </details>
    )
  }