/// <reference types="react" />
/// <reference types="react-redux" />
import React from 'react';
export interface AddTodoProps {
    dispatch: any;
}
declare let AddTodoWrapper: React.ComponentClass<Pick<AddTodoProps, never>> & {
    WrappedComponent: React.ComponentType<AddTodoProps>;
};
export default AddTodoWrapper;
