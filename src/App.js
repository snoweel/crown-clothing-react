import React from 'react';
// import logo from './logo.svg';
import './App.css';

import {Route,Switch,Redirect}  from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";




import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CategoryPage from "./pages/collection/collection.component";
// const HomePageAlt = (props) =>{
//     console.log(props)
//   return(<div>
//       <h1> Home PAGE</h1>
//       <Link to='/hats'> to Hats</Link>
//       <button onClick={()=> props.history.push('/hats')}>to hats</button>
//   </div>);
// }
//
// const HatsPage = (props) =>(
//     <div>
//         <h1> HATS PAGE</h1>
//         <Link to='/hats/1'> to Hats 1</Link>
//         <Link to={`${props.match.url}/:17`}> to Hats 17</Link>
//         <Link to={`${props.match.url}/:18`}> to Hats 18</Link>
//     </div>
// )
//
// const HatsDetailPage = (props) => {
//     console.log(props)
//     return (
//         <div>
//             <h1> HATS Detail PAGE for {props.match.params.hatId}</h1>
//         </div>
//     )
// }


class App extends React.Component {

    unsubscribeFromAuth = null;

    // constructor() {
    //     super();
    //
    //     this.state={
    //         currentUser: null
    //     };
    // }

componentDidMount() {
    const {setCurrentUser} = this.props;
       this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
            // console.dir(user);
           if(userAuth){
               const userRef = await createUserProfileDocument(userAuth);

               userRef.onSnapshot(snapshot => {
                   // console.log('componentDidMount => userRef.onSnapshot => snapshot',snapshot.data());

                   setCurrentUser({

                           id:snapshot.id,
                           ...snapshot.data()
                   }
                   // ,()=>{
                   //     console.log('componentDidMount =>this.state',this.state);
                   // }
                   );

               })
           }else{
               setCurrentUser(userAuth);
               // addCollectionsAndDocuments('collections',collectionsArray.map(({title,items})=>({title,items})));
           }

            // this.setState({currentUser:user})

        })// auth.onAuthStateChanged
}

componentWillUnmount() {
    this.unsubscribeFromAuth();
}



    render() {
        return (
            <div >
                {/*<Header currentUser={this.state.currentUser}></Header>*/}
                <Header></Header>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    {/*    <Route exact path='/' component={HomePageAlt}/>*/}
                    <Route  path='/shop' component={ShopPage}/>
                    {/*<Route exact path='/shop/jacket' component={CategoryPage}/>*/}
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    {/*<Route exact path='/signin' component={SignInAndSignUpPage}/>*/}
                    <Route
                        exact
                        path='/signin'
                        render={()=>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ):(
                                <SignInAndSignUpPage/>
                            )
                        }
                    />

                </Switch>

            </div>
        );
    }


}

const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
    setCurrentUser:user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
