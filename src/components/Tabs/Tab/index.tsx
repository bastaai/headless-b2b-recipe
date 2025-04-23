import React, { ReactElement } from 'react';

type Props = {
  title: string;
  children: ReactElement | ReactElement[];
};

export const Tab = ({ children }: Props) => ( <div>{children}</div>);