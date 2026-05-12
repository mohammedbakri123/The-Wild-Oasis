import { useEffect, useRef } from "react";
export function useOutsideClick<T extends HTMLElement>(
  handler: CallableFunction,
) {
  const ref = useRef<T>(null!);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handler]);
  return ref;
}

// import { useEffect, useRef } from "react";

// export function useOutsideClick<T extends HTMLElement>(handler: () => void) {
//   const ref = useRef<T>(null);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         handler();
//       }
//     }

//     document.addEventListener("mousedown", handleClick);

//     return () => {
//       document.removeEventListener("mousedown", handleClick);
//     };
//   }, [handler]);

//   return ref;
// }
