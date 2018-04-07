/// <reference types="react" />
/// <reference types="react-redux" />
import { StatelessComponent, ComponentClass } from 'react';
import { LinkProps } from '../link';
declare const FilterLink: ComponentClass<any> & {
    WrappedComponent: StatelessComponent<LinkProps> | ComponentClass<LinkProps>;
};
export default FilterLink;
