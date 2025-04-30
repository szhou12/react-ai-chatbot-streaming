import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from './components/ui/provider'

const root = createRoot(document.getElementById('root'));


root.render(
	<StrictMode>
		<Provider>
			<App />
		</Provider>
	</StrictMode>
)
