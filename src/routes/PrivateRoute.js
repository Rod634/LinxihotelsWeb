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
            return ( <Redirect to="/"/> );
        }

        if(signed && (!isPrivate)){
            return ( <Redirect to="/catalogo"/> );
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