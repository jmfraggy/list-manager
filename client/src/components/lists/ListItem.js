import React from 'react'

const ListItem = ({ list }) => {

    const { id, name, subList } = list;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
            </h3>
            <ul className="list">
                {subList.map((list, i) =>
                    <li key={i}>{list}</li>
                )}
            </ul>
        </div>
    )
}

export default ListItem;
