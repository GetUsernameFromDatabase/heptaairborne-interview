import React, { FC, ReactNode, createContext, useState } from 'react';

// Define the type of the context state
interface SelectedLocationState {
  selectedLocation: string | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Props {
  children: ReactNode;
}

const SelectedLocationContext = createContext<SelectedLocationState>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

const SelectedLocationProvider: FC<Props> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <SelectedLocationContext.Provider
      value={{ selectedLocation, setSelectedLocation }}
    >
      {children}
    </SelectedLocationContext.Provider>
  );
};

export { SelectedLocationContext, SelectedLocationProvider };
