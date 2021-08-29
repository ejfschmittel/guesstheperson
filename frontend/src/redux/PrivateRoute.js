import { Redirect, Route } from "react-router-dom"


const PrivateRoute = ({component: Component, ...props}) => {
    const auth =  useSelector(store => store.user.token)

    return (
        <Route 
            render={props => 
                auth ? 
                    <Component {...props} />
                :
                <Redirect to="/login" />
            } 
        />
    )
}

export default PrivateRoute