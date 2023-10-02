import React, {
  FC,
  useState,
  useEffect,
  ReactNode,
  ComponentType,
  LazyExoticComponent,
} from 'react';

interface ClientOnlyProps {
  fallback: NonNullable<ReactNode> | null;
  component: () => Promise<{ default: ComponentType<any> }>;
}

const ClientOnly: FC<ClientOnlyProps> = ({ fallback, component }) => {
  const [Component, setComponent] = useState<LazyExoticComponent<
    ComponentType<any>
  > | null>(null);

  useEffect(() => {
    setComponent(() => React.lazy(component));
  }, [component]);

  return (
    <React.Suspense fallback={fallback}>
      {Component && <Component />}
    </React.Suspense>
  );
};

export { ClientOnly };
