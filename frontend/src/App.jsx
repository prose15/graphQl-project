import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/ui/Header";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFound from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {

	const {data , loading} = useQuery(GET_AUTHENTICATED_USER)	
	const authUser = data?.authUser

	if(loading){
		return null 
	}

	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login'/>} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/'/>} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/'/>} />
				<Route path='/transaction/:id' element={<TransactionPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster/>
		</>
	);
}
export default App;