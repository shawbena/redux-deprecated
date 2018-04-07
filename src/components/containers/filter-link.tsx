import { StatelessComponent, ComponentClass } from 'react';
import { connect } from 'react-redux';
import { setVisibiltyFilter } from '../../store/actions';
import { State } from '../../store/state';
import Link, { LinkProps } from '../link';

const mapStateToProps = (state: State, ownProps: any) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick: () => {
            dispatch(setVisibiltyFilter(ownProps.filter));
        }
    };
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink;