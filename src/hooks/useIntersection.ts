import { useEffect } from "react";

let listenerCallbacks = new WeakMap();
//@ts-ignore
let observer;
//@ts-ignore
function handleIntersections(entries) {
  //@ts-ignore
  entries.forEach((entry) => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        //@ts-ignore
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  //@ts-ignore
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: "100px",
      //@ts-ignore
      threshold: "0.15",
    });
  }
  //@ts-ignore
  return observer;
}
//@ts-ignore
export function useIntersection(elem, callback) {
  useEffect(() => {
    let target = elem.current;
    let observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}
