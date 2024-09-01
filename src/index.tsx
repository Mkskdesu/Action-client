/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App/App'

import "global/styles/style.scss";

const root = document.getElementById('root')

render(() => <App />, root!)
