
import './App.css';
import SlateApp from './components/TxtEditor.js'
import SlateFontsApp from './components/TxtFormat.js'
import MainFontsApp from './components/tanEditor'
import Editor from './components/Editor/index';


function App() {
  return (
    <div className="App">
      <h1>SlateJS Impementation</h1>
      <Editor />
    </div>
  );
}

export default App;
