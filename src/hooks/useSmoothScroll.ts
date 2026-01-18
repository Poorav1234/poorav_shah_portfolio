import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if the clicked element is a link with a hash
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const href = target.getAttribute('href');
        if (!href) return;
        
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL without causing a full page load
          history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export default useSmoothScroll;