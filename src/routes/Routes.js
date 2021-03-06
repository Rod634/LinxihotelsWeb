import {Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Catalog from '../pages/catalog';
import Reservation from '../pages/reservation';
import Profile from '../pages/profile';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';


export default function Routes(){
    return(
        <Switch>
            <PrivateRoute exact path='/' component={Catalog}/>
            <PrivateRoute exact isPrivate path='/catalogo' component={Catalog}/>
            <PrivateRoute exact path='/signIn' component={SignIn}/>
            <PrivateRoute exact path='/signUp' component={SignUp}/>
            <PrivateRoute exact isPrivate path='/reservation/:id' component={Reservation}/>
            <PrivateRoute isPrivate exact path='/profile' component={Profile}/>
        </Switch>
    )
}
