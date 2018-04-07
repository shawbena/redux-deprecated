/// <reference types="react" />
import React, { SFC } from 'react';
export interface LinkProps {
    active: boolean;
    children?: React.ReactNode;
    onClick: any;
}
declare const Link: SFC<LinkProps>;
export default Link;
