import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root container missing in index.html')
}

var counter = 0;

setInterval(()=>{
  counter += 1;
  createRoot(rootElement).render(
    <StrictMode>
      <App counter={counter}/>
    </StrictMode>
  );
},1000);

createRoot(rootElement).render(
  <StrictMode>
    <App counter={counter}/>
  </StrictMode>,
)
