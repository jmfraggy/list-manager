import React, { useState, useContext, useEffect } from 'react';
import ListContext from '../../context/list/listContext';

const ListEdit = () => {
    // Initialize, and destructure Context State
    const listContext = useContext(ListContext);
    const { addList, clearCurrent, updateList, current } = listContext;

    useEffect(() => {
        // If editing 
        if (current !== null) {
            setList(current)
        } else {
            setList({
                name: '',
                subList: []
            });
        }
    }, [listContext, current]); // Dependencies to prevent loop

    const [list, setList] = useState({
        name: '',
        subList: []
    });

    const onChange = e => setList({
        ...list,
        [e.target.name]: e.target.value,
    });

    const onChangeElement = (i, e) => {
        let newArr = [...subList]; // Never modify directly the state
        newArr[i] = e.target.value; // Update the current value
        setList({
            ...list,
            subList: newArr,
        });
    };

    const onDeleteElement = (i, e) => {
        let newArr = [...subList];
        setList({
            ...list,
            subList: newArr.filter((el, id) => id !== i),
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            // Create List
            addList(list);
        } else {
            // Update List
            updateList(list);
        }
        clearCurrent();
    };

    const addElement = e => {
        e.preventDefault();
        setList({
            ...list,
            subList: [...subList, '']
        });
    };

    const clearAll = () => {
        clearCurrent();
    };

    const { name, subList } = list;
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? 'Update List' : 'Add List'}
            </h2>
            <input
                type='text'
                placeholder='List Name'
                name='name'
                value={name}
                onChange={onChange} />
            {subList.map((list, i) =>
                <div key={i} style={{ display: 'table' }}>
                    <button 
                        type='button' 
                        className='btn-delete btn-block'
                        onClick={(e) => onDeleteElement(i, e)}>
                        <i className="fas fa-times"></i>
                    </button>

                    <div style={{ display: 'table-cell', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Sub List"
                            name='subList'
                            value={list}
                            key={i}
                            onChange={(e) => onChangeElement(i, e)} />
                    </div>
                </div>
            )}
            <div>
                <button type='addElement' className="btn btn-light btn-sm btn-block text-center" onClick={addElement}>Add Element</button>
                <input
                    type='submit'
                    value={current ? 'Update List' : 'Add List'}
                    className="btn btn-primary btn-block" />
                {current && (<div>
                    <button
                        className="btn btn-light btn-sm btn-block"
                        onClick={clearAll}>Clear</button>
                </div>)}
            </div>

        </form>
    )
}

export default ListEdit
