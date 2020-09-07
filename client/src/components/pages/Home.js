import React from 'react'
import Lists from '../lists/Lists';

const Home = () => {
    return (
        <div >
            <div className="card">
                <p className="bg-dark p text-center">
                    Add New List
                    </p>
            </div>
            <div className="grid-3">

                <Lists />
            </div>
        </div>
    )
}

export default Home
