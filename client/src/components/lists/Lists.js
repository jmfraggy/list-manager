import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ListContext from '../../context/list/listContext';
import ListItem from './ListItem';
import Spinner from '../../components/layout/Spinner';

const Lists = () => {
    const listContext = useContext(ListContext); // Init the Context
    const { lists, getLists, loading } = listContext;

    useEffect(() => {
        getLists();
        // eslint-disable-next-line
    }, []);

    if (lists !== null && lists.length === 0 && !loading) {
        return <h3 className="text-center">Click the button to add a List!</h3>;
    }

    return (
        <Fragment >
            {lists !== null && !loading ? (
                <TransitionGroup className="grid-3">
                    {lists.map(list =>
                        <CSSTransition key={list._id} timeout={500} classNames="item">
                            <ListItem list={list} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            ) : <Spinner />}
        </Fragment>
    )
}

export default Lists;
