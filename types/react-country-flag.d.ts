declare module 'react-country-flag' {
  import * as React from 'react';

  export interface ReactCountryFlagProps extends React.HTMLAttributes<HTMLSpanElement> {
    countryCode: string; // ISO 3166-1-alpha-2 code
    svg?: boolean;
    title?: string;
    // Additional props supported by underlying <span>
  }

  const ReactCountryFlag: React.FC<ReactCountryFlagProps>;

  export default ReactCountryFlag;
} 