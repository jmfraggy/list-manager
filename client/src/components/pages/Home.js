import React from 'react'
import Lists from '../lists/Lists';
import ContactForm from '../lists/ListForm';

const Home = () => {
    return (
        <div className="grid-2">
            <ContactForm />
            <div>
                <p className="bg-primary p text-center">
                    <i className="fas fa-plus"></i>
                </p>
                <div>
                    <Lists />
                </div>
            </div>

        </div>
    )
}

export default Home
