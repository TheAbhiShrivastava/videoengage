import React, {useEffect} from 'react';
import './App.css';
import VIAppBar from './components/app-bar/VIAppBar';
import AppFooter from './components/app-footer/AppFooter';
import Button from '@mui/joy/Button';
import ContactModal from './components/contact-modal/ContactModal';
function App() {
  const [answers, setAnswers] = React.useState([]);
  const [openContactModal, setOpenContactModal] = React.useState(false);
  let videoId = '';
  const search = window.location.search;
  const params = new URLSearchParams(search);
  videoId = params.get('vid_id');
  useEffect(() => {
    document.body.addEventListener('click', handleClick );

    return function cleanup() {
      window.removeEventListener('click', handleClick );
    } 
  },[]);
  let handleClick = (e) => {
    let clickedEl = e?.composedPath()[0];
    if (clickedEl.nodeName === 'SPAN' && clickedEl?.parentNode?.type === 'button'){
      setAnswers((prevState => {
        return [...prevState, clickedEl.innerText];
      }));
    }
    
  }
  return (
    <div className="App">
      <header>
        
        <VIAppBar></VIAppBar>
      </header>
      <div className="video-container">
        <div className="voomly-embed player-styles" 
          data-id={videoId} 
          data-ratio="0.600000" 
          data-type="f" 
          data-skin-color="#008EFF" 
          data-shadow="">
            
        </div>
      </div>
      {answers.length > 0 && <div className='current-selections'>
        <ul>
          {answers.map(ans => <li>{ans}</li>)}
        </ul>
      </div>}
      <ContactModal open={openContactModal} interactions={answers}></ContactModal>
      <Button type="button" style={{marginTop: 20}} onClick={()=> setOpenContactModal(true)}>Contact</Button>
      <div className='footer-container'>
        <AppFooter></AppFooter>
      </div>
    </div>
  );
}

export default App;
