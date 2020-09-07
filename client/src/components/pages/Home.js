import React, { useContext, useEffect } from 'react'
import Lists from '../lists/Lists';
import ContactForm from '../lists/ListForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    // Check for the user when the component load
    useEffect(()=> {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <ContactForm />
            <div>
                {/* <p className="bg-primary p text-center">
                    <i className="fas fa-plus"></i>
                </p> */}
                <div>
                    <Lists />
                </div>
            </div>

        </div>
    )
}

export default Home
