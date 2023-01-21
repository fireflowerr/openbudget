import { MutableRefObject, Ref, RefObject, useCallback, useRef, useState } from 'react';

/**
 * Use state with a ref to peer into the current value.
 *
 * @param initialState
 */
export const useStateRef = <T=unknown,>(initialState: T): [T, (newState: T) => void, MutableRefObject<T>] => {
  const ref = useRef(initialState);
  const state = useState(initialState);

  const setState = useCallback((newState: T) => {
    state[1](newState);
    ref.current = newState;
  },  []);

  return [state[0], setState, ref];
}
