export default function ExtendedButton({ title, link }) {
    const handleClick = () => {
      window.location.href = link; // Redirects to the specified link
    }
  
    return (
      <button onClick={handleClick} className="text-white 
      
      // Background
      bg-gradient-to-b from-purple50 to-purple100 hover:from-purple50 hover:to-purple100 active:from-purple50 active:to-purple140
  
      // Shadow
      shadow-sm hover:shadow-md
  
      // Shadow
      rounded-full hover:rounded-lg 
      
      // Font 
      font-medium  text-md 
      
      // Padding
      px-7 py-2.5">
        {title}
      </button>
    )
  }
  