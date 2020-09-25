import React from "react"
import ReactDOM from "react-dom"
import App from "./components/app/app"
import {NBUProvider} from "./components/NBU-service-context/NBUServiceContext"
import NBUService from "./services/NBUService"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import ErrorBoundry from "./components/error-boundry/error-boundry";
import store from "./store";
const nbuService = new NBUService()
const obj={
    id:2,
    name:"dima"
}
const app =(
    <Provider store={store}>
        <ErrorBoundry>
            <NBUProvider value={nbuService}>
                <Router>
                    <App/>
                </Router>
            </NBUProvider>
        </ErrorBoundry>
    </Provider>
)
ReactDOM.render(app,document.getElementById('root'))