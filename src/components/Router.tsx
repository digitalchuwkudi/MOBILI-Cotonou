import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  path: string;
  search: string;
  hash: string;
  navigate: (to: string, options?: { scroll?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [search, setSearch] = useState(typeof window !== 'undefined' ? window.location.search : '');
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      setSearch(window.location.search);
      setHash(window.location.hash);
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Listen to custom navigation events
    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ scroll?: boolean }>;
      const shouldScroll = customEvent.detail?.scroll !== false && !window.location.hash;
      setPath(window.location.pathname);
      setSearch(window.location.search);
      setHash(window.location.hash);
      if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('navigated', handleCustomNavigate as EventListener);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigated', handleCustomNavigate as EventListener);
    };
  }, []);

  // Smooth scroll to hash anchor element if present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [path, search, hash]);

  const navigate = (to: string, options?: { scroll?: boolean }) => {
    if (typeof window !== 'undefined') {
      const currentFull = window.location.pathname + window.location.search + window.location.hash;
      if (currentFull === to) {
        if (to.includes('#')) {
          const id = to.split('#')[1];
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }
      
      window.history.pushState(null, '', to);
      const event = new CustomEvent('navigated', { detail: options || {} });
      window.dispatchEvent(event);
    }
  };

  return (
    <RouterContext.Provider value={{ path, search, hash, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }

  // Parse query parameters
  const queryParams = new URLSearchParams(context.search);
  const params: Record<string, string> = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });

  return {
    path: context.path,
    search: context.search,
    hash: context.hash,
    queryParams: params,
    navigate: context.navigate,
  };
};

// Custom Link Component
export interface LinkProps {
  to: string;
  children?: React.ReactNode;
  activeClassName?: string;
  exact?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  'aria-label'?: string;
  key?: any;
  target?: string;
  rel?: string;
}

export const Link = (props: LinkProps) => {
  const { to, children, activeClassName, exact = false, className, onClick, ...rest } = props;
  const { path, hash, navigate } = useRouter();

  // Check if active, with support for hashes
  let isRouteActive = false;
  if (to.includes('#')) {
    const [toPath, toHash] = to.split('#');
    const pathMatch = toPath === '/' ? path === '/' : path.startsWith(toPath);
    isRouteActive = pathMatch && hash === `#${toHash}`;
  } else {
    if (exact) {
      if (to === '/') {
        // Root Home is only active if we are on '/' AND there is no active hash
        isRouteActive = path === '/' && !hash;
      } else {
        isRouteActive = path === to;
      }
    } else {
      isRouteActive = path.startsWith(to);
    }
  }

  const combinedClassName = `${className || ''} ${isRouteActive && activeClassName ? activeClassName : ''}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    // Check if it's a standard left click without modifier keys
    if (!e.defaultPrevented && e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} className={combinedClassName} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

// Path parsing helper
const matchPath = (pattern: string, actualPath: string): Record<string, string> | null => {
  const patternParts = pattern.split('/').filter(Boolean);
  const actualParts = actualPath.split('/').filter(Boolean);

  if (patternParts.length !== actualParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const pPart = patternParts[i];
    const aPart = actualParts[i];

    if (pPart.startsWith(':')) {
      const paramName = pPart.slice(1);
      params[paramName] = decodeURIComponent(aPart);
    } else if (pPart !== aPart) {
      return null;
    }
  }

  return params;
};

// Custom Switch component
interface RouteProps {
  path: string;
  element: React.ReactElement;
}

export const Route = ({ path: routePath, element }: RouteProps) => {
  const { path: currentPath } = useRouter();
  const match = matchPath(routePath, currentPath);

  if (routePath === currentPath || match) {
    // Clone element and inject route params
    return React.cloneElement(element, { routeParams: match || {} });
  }

  return null;
};

interface SwitchProps {
  children: ReactNode;
}

export const Switch = ({ children }: SwitchProps) => {
  const { path: currentPath } = useRouter();
  let matchedElement: ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (matchedElement) return;

    if (React.isValidElement<RouteProps>(child)) {
      const routePath = child.props.path;
      const match = matchPath(routePath, currentPath);

      if (routePath === currentPath || (routePath !== '*' && match) || routePath === '*') {
        matchedElement = React.cloneElement(child.props.element, { routeParams: match || {} });
      }
    }
  });

  return matchedElement;
};
