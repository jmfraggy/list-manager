import React, { Fragment, useContext } from 'react'

import ListContext from '../../context/list/listContext';
import ListItem from './ListItem';

const Lists = () => {
    const listContext = useContext(ListContext); // Init the Context
    const { lists } = listContext;
    return (
        <Fragment >
            {lists.map(list =>
                <ListItem list={list} key={list.id}/>
            )}
        </Fragment>
    )
}

export default Lists;
