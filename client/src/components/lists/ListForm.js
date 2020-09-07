import React, { useState, useContext } from 'react';
import ListContext from '../../context/list/listContext';

const ListEdit = () => {
    const listContext = useContext(ListContext);

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
    
    const onSubmit = e => {
        e.preventDefault();
        listContext.addList(list);
        setList({
            name: '',
            subList: []
        });
    };

    const addElement = e => {
        e.preventDefault();
        setList({
            ...list,
            subList: [...subList, '']
        })
    };
    const { name, subList } = list;
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add List</h2>
            <input
                type='text'
                placeholder='List Name'
                name='name'
                value={name}
                onChange={onChange} />
            {subList.map((list, i) => <input
                type="text"
                placeholder="Sub List"
                name='subList'
                value={list}
                key={i}
                onChange={(e) => onChangeElement(i, e)} />
            )} 
            <div>
                <button type='addElement' value='Add Element' className="btn btn-light btn-block text-center" onClick={addElement}>Add Element</button>
                <input type='submit' value='Add List' className="btn btn-primary btn-block" />
            </div>

        </form>
    )
}

export default ListEdit
