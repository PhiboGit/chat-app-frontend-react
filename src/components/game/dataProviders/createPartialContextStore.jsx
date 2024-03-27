// https://github.com/jherr/fast-react-context

import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export default function createPartialContextStore(initialState) {
  function useStoreData(){
    // holds any type of data in the store
    const store = useRef(initialState);

    // lets you access the stored data
    const get = useCallback(() => store.current, []);

    // functions that need to be called when the store is updated
    const subscribers = useRef(new Set());

    // lets you change the state of the store
    const set = useCallback((value) => {
      // Check if value is a function (updater function)
      if (typeof value === 'function') {
        // Call the updater function with the current state
        const updatedValue = value(store.current);
        // Update the store with the result of the updater function
        //store.current = { ...store.current, ...updatedValue };
        store.current = updatedValue;
      } else {
        // If value is not a function, treat it as a direct value update
        //store.current = { ...store.current, ...value };
        store.current = value
      }
      subscribers.current.forEach((callback) => callback());
    }, []);

    // add a function to the subscribers; return a function to unsub
    const subscribe = useCallback((callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const StoreContext = createContext(null);

  function Provider({ children }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  //custom hook for the store, the selector lets you listen to only partial data of the state
  function useStore(selector) {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }

    // trigger a re-render when the selected state changes
    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get())
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}