import React from 'react'

const ListItem = ({ list }) => {

    const { id, name, subList } = list;

    return (
        <div className="card bg-light">
            <div>
                <h3 className="text-primary text-left">
                    {name} {' '}
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
            {/* <div className='grid-2'>
                <button style={{float:'left'}}className="btn btn-danger text-center">Delete</button>
                <button style={{float:'right'}}className="btn btn-dark text-center">Edit</button>
            </div> */}
        </div>
    )
}

export default ListItem;
