import React, { SFC } from 'react';
import FilterLink from '../containers/filter-link';
import { VisibilityFilters } from '../../store/actions';


const Footer: SFC = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
            All
        </FilterLink>
        {' '}
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
            Active
        </FilterLink>
        {', '}
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterLink>
    </p>
);

export default Footer;