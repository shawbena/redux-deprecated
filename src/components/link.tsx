import React, { SFC } from 'react';
import PropTypes from 'prop-types';

export interface LinkProps{
    active: boolean;
    children?: React.ReactNode, // Link.propTypes 是 LinkProps 类型，所以要在这时指定 children 而非使用 SFC 中提供的值
    onClick: any;
}
const Link: SFC<LinkProps> = ({ active, children, onClick}) => {
    // active 表示什么意思？已完成的待办事项吗？
    if(active){
        return <span>{ children }</span>;
    }
    return (
        <a href="" onClick={e => {
            e.preventDefault();
            onClick();
        }}>{ children }</a>
    );
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;