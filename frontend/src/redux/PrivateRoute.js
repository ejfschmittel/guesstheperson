import { Redirect, Route } from "react-router-dom"
import { isExpired, parseJwt} from "../utils/jwt.utils"
import { useSelector, useDispatch } from "react-redux"
import userActions from "../redux/user/user.actions"



const useIsLoggedIn = (redirectUrl) => {
    const dispatch = useDispatch();
    const auth =  useSelector(store => store.user.auth_token)
    const isTokenExpired = isExpired(parseJwt(auth))



    if(auth && isTokenExpired){
        // logout 
        dispatch(userActions.logout())
    }

    // return is LoggedIN
    return auth && !isTokenExpired;
}

const PrivateRoute = ({component: Component, ...props}) => {
   /* const auth =  useSelector(store => store.user.token)
    const isTokenExpired = isExpired(parseJwt(auth))


    console.log(auth)
    console.log(isTokenExpired)*/

    const isLoggedIn = useIsLoggedIn();

    return (
        <Route 
            {...props}
            render={props => 
                isLoggedIn ? 
                    <Component {...props} />
                :
                <Redirect to={{
                    pathname: "/login",
                    state: {referrer: props.location}
                }} />
            } 
        />
    )
}

export default PrivateRoute