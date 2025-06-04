import { useEffect, useLayoutEffect, useRef } from "react"

const SCROLL_THRESHOLD = 10

function useAutoScroll(active) {
    const scrollContentRef = useRef(null)
    const isDisabled = useRef(false)
    const prevScrollTop = useRef(null)
  
    useEffect(() => {
      const node = scrollContentRef.current
    //   if (!node) return // place null checking here - user's message won't trigger auto-scroll
  
      const resizeObserver = new ResizeObserver(() => {
        if (!node) return // null checking switched to here - will trigger auto-scroll
        const { scrollHeight, clientHeight, scrollTop } = node
        if (!isDisabled.current && scrollHeight - clientHeight > scrollTop) {
          node.scrollTo({
            top: scrollHeight - clientHeight,
            behavior: 'smooth'
          })
        }
      })
  
      resizeObserver.observe(node)
      return () => resizeObserver.disconnect()
    }, [])
  
    useLayoutEffect(() => {
      const node = scrollContentRef.current
      if (!node || !active) return
  
      function onScroll() {
        const { scrollHeight, clientHeight, scrollTop } = node
        // Case 1: User scrolls up, not close to bottom
        // Case 2: User scrolls down, close to bottom (<= threshold)
        if (
          !isDisabled.current &&
          scrollTop < prevScrollTop.current &&
          scrollHeight - clientHeight - scrollTop > SCROLL_THRESHOLD
        ) {
          isDisabled.current = true
        } else if (
          isDisabled.current &&
          scrollHeight - clientHeight - scrollTop <= SCROLL_THRESHOLD
        ) {
          isDisabled.current = false
        }
        prevScrollTop.current = scrollTop
      }
  
      // Initial value setup
      isDisabled.current = false
      prevScrollTop.current = node.scrollTop
  
      node.addEventListener('scroll', onScroll)
  
      return () => node.removeEventListener('scroll', onScroll)
    }, [active])
  
    return scrollContentRef
  }

export default useAutoScroll
  