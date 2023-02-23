import './App.css';


function App() {
  return (
      <div className="card-whole">
        <h2>News Articles</h2>
        <div className="row">
          <input type="checkbox" />
          <div className="headbutton">
            <button className="publish" id="publishid">Publish</button>
            <button className="delete">Delete</button>
          </div>
          <div className="searchbar">
            <input type="text" className="ssbar" placeholder="search..." /*onKeyUp={}*/ id="search" /*onFocus="this.value=''"*/onFocus={(e) => e.target.type = ''} />
          </div>
        </div>

        <div id="listcards"></div>
      </div>
  );
}

export default App;
