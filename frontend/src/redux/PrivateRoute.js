import { Redirect, Route } from "react-router-dom"
import { isExpired, parseJwt} from "../utils/jwt.utils"

const PrivateRoute = ({component: Component, ...props}) => {
    const auth =  useSelector(store => store.user.token)

    const isTokenExpired = isExpired(parseJwt(auth))

    return (
        <Route 
            render={props => 
                auth && !isTokenExpired ? 
                    <Component {...props} />
                :
                <Redirect to="/login" />
            } 
        />
    )
}

export default PrivateRoute