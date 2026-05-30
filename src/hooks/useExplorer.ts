import { useEffect } from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { getNode, getChildren, getAncestors } from '../engine/hierarchy';
import { getObjectById } from '../data/catalog';
import { TRANSITION_MS } from '../engine/camera';

/**
 * High-level facade over the navigation engine. Components use this instead of
 * touching the store directly: it resolves the focused node, its children, the
 * breadcrumb trail and the backing catalog object, and auto-completes the
 * active travel transition after its duration elapses.
 */
export function useExplorer() {
  const focusId = useNavigationStore((s) => s.focusId);
  const isTransitioning = useNavigationStore((s) => s.isTransitioning);
  const history = useNavigationStore((s) => s.history);
  const backStack = useNavigationStore((s) => s.backStack);
  const forwardStack = useNavigationStore((s) => s.forwardStack);

  const focusNode = useNavigationStore((s) => s.focusNode);
  const zoomIn = useNavigationStore((s) => s.zoomIn);
  const zoomOut = useNavigationStore((s) => s.zoomOut);
  const back = useNavigationStore((s) => s.back);
  const forward = useNavigationStore((s) => s.forward);
  const endTransition = useNavigationStore((s) => s.endTransition);
  const reset = useNavigationStore((s) => s.reset);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(endTransition, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [isTransitioning, focusId, endTransition]);

  const node = getNode(focusId);
  const children = getChildren(focusId);
  const breadcrumb = getAncestors(focusId);
  const object = node?.objectId ? getObjectById(node.objectId) : undefined;

  return {
    node,
    children,
    breadcrumb,
    object,
    history,
    isTransitioning,
    canZoomIn: children.length > 0,
    canZoomOut: Boolean(node?.parentId),
    canBack: backStack.length > 0,
    canForward: forwardStack.length > 0,
    focusNode,
    zoomIn,
    zoomOut,
    back,
    forward,
    reset,
  };
}

export default useExplorer;
