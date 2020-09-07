import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ListContext from '../../context/list/listContext';
import ListItem from './ListItem';

const Lists = () => {
    const listContext = useContext(ListContext); // Init the Context
    const { lists } = listContext;
    return (
        <Fragment >
            <TransitionGroup>
                {lists.map(list =>
                    <CSSTransition key={list.id} timeout={500} classNames="item">
                        <ListItem list={list}  />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </Fragment>
    )
}

export default Lists;
