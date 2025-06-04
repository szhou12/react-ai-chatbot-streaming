import { useEffect, useLayoutEffect, useRef } from "react"

const SCROLL_THRESHOLD = 10

/**
 * KEY CHANGES:
 * Changed all document.documentElement references to use scrollContentRef.current instead
 * Changed window.scrollY to use the container's scrollTop
 * Changed scroll event listener from window to the container element
 * Added null checks for scrollContentRef.current
 * Fixed a typo in behavior (was hehavior)
 * Updated comments to reflect container-specific behavior
 */

function useAutoScrollChat(messages, active) {
    console.log("who is triggering: ", messages[messages.length-1]?.role)

    const scrollContentRef = useRef(null)
    const isDisabled = useRef(false)
    const prevScrollTop = useRef(null)

    useEffect(() => {
        const node = scrollContentRef.current
        // if (!node) return

        // ResizeObserver listens for changes to the size (height/width) of the scrollable chat container
        // When the container's size changes (message arrives), the observer triggers a callback - auto-scroll to bottom
        const resizeObserver = new ResizeObserver(() => {
			if (!node) return

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
            
            
            if (!isDisabled.current && scrollTop < prevScrollTop.current && scrollHeight - clientHeight - scrollTop > SCROLL_THRESHOLD) {
                // Case 1: User scrolls up, not close to bottom
                isDisabled.current = true
            } else if (isDisabled.current && scrollHeight - clientHeight - scrollTop <= SCROLL_THRESHOLD) {
                // Case 2: User scrolls down, close to bottom (<= threshold)
                isDisabled.current = false
            }

            prevScrollTop.current = scrollTop
        }

        // initial value setup
        isDisabled.current = false
        prevScrollTop.current = node.scrollTop
        
        node.addEventListener('scroll', onScroll)

        return () => node.removeEventListener('scroll', onScroll)
    }, [active])

    // Handles new message arrival (explicit scroll)
    useLayoutEffect(() => {
        const node = scrollContentRef.current
        if (!node || !active) return

        console.log('Scroll effect triggered:', {
            scrollHeight: node.scrollHeight,
            clientHeight: node.clientHeight,
            isDisabled: isDisabled.current,
            timestamp: new Date().toISOString()
        })

        // Only auto-scroll if not disabled (user hasn't scrolled up)
        if (!isDisabled.current) {
            node.scrollTo({
                top: node.scrollHeight - node.clientHeight,
                behavior: 'smooth'
            })
        }
        // Optionally: if you want always scroll, drop the condition

    }, [messages, active])

    return scrollContentRef
}

  
export default useAutoScrollChat
  
