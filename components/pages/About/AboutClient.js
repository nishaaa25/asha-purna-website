export default function AwardsClient({ children }) {
  useEffect(() => {
    // Enable normalized scrolling across browsers
    ScrollTrigger.normalizeScroll(true);

    // Optional: refresh ScrollTrigger on resize
    ScrollTrigger.refresh();

    return () => {
      // Cleanup if needed
      ScrollTrigger.normalizeScroll(false); // disable normalization on unmount
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
  }, []);
  return children;
}
