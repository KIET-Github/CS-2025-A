import { useEffect } from "react";

/**
 * Hook for removing element if user clicks outside that container.
 *
 * Ex: useClickOutside(ref,)
 *
 * @param ref Refrence to the container on which outside click is applied
 * @param callback Callback function which needs to be triggered when clicking outside
 */

const useClickOutside = (ref, callback) => {
  const handleCallback = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("touchstart", handleCallback);
    document.addEventListener("click", handleCallback);
    return () => {
      document.removeEventListener("click", handleCallback);
      document.removeEventListener("touchstart", handleCallback);
    };
  });
};

export default useClickOutside;
