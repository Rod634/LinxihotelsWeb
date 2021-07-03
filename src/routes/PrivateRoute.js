import {Route, Redirect} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthProvider'

export default function PrivateRoute({
    component: Component,
    isPrivate,
    ...rest
})
    {
        const {signed} = useContext(AuthContext);
        if(!signed && isPrivate){
            return ( <Redirect to="/catalog"/> );
        }

        if(signed && (!isPrivate)){
            return ( <Redirect to="/profile"/> );
        }

        return(
            <Route
                {...rest}
                render={props => (
                    <Component {...props}/>
                )}
            />
        )
    }