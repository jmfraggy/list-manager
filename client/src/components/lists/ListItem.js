import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ListContext from '../../context/list/listContext';

const ListItem = ({ list }) => {
    const listContext = useContext(ListContext);
    const { deleteList, setCurrent, clearCurrent } = listContext;

    const { _id, name, subList } = list;

    const onDelete = () => {
        deleteList(_id);
        clearCurrent();
    };

    return (
        <div className="card bg-light">
            <div>
                <h3 className="text-primary text-left">
                    {name}
                </h3> 
            </div>
            <ul>
                {subList.length > 0 && subList.map((list, i) =>
                    <li className="badge badge-light p m text-left" key={i}>
                        {list}
                        <p style={{float:'right'}}>  </p>

                    </li>
                )}
                <div>
                {/* <button className="btn btn-danger text-center">Delete</button> */}
                    {/* <i className="fas fa-trash"></i> */}
                </div>
            </ul>
            <div className='grid-2'>
                <button 
                    style={{float:'left'}}
                    className="btn btn-danger btn-sm text-center"
                    onClick={onDelete}> Delete </button>
                <button 
                    style={{float:'right'}}
                    className="btn btn-dark btn-sm text-center"
                    onClick={() => setCurrent(list)}
                    >Edit</button>
            </div>
        </div>
    )
};

ListItem.propTypes = {
    list: PropTypes.object.isRequired,
};

export default ListItem;
