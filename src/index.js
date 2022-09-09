import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {marked} from "marked";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
<i class="fa-solid fa-grip-lines-vertical"></i>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:'',
      verticalOrientation:false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
  }

  handleEditorChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  handleOrientationChange() {
    this.setState({
      verticalOrientation: !this.state.verticalOrientation
    });
  }

  render() {
    let classNames = this.state.verticalOrientation
      ? ['appContainer-vertical','fa-solid fa-grip-lines','editor-container-vertical','preview-container-vertical','dev-info-vertical']
      : ['appContainer-horizontal','fa-solid fa-grip-lines-vertical','editor-container-horizontal','preview-container-horizontal','dev-info-horizontal'];
    // console.log(this.state.input);
    console.log(this.state.verticalOrientation)
    return (
      <div id="app-container" className={classNames[0]}>
        <div id = "options">
          <button className = "layoutButton" onClick = {this.handleOrientationChange}><i className={classNames[1]}></i></button>
        </div>
        <Editor input={this.state.input} onChange={this.handleEditorChange} orientClass={classNames[2]} />
        <Preview text={this.state.input} orientClass={classNames[3]}/>
        <DevInfo orientation={classNames[4]}/>
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <div id='editor-container' className={props.orientClass}>
      <div id="editor-header" className="header">
        <h3>Editor</h3>
      </div>
      <div id='editor-text-container'>
        <textarea
          id="editor"
          // rows="10"
          placeholder="Enter text for markup..."
          value={props.input}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

const Preview = (props) => {
  return (
    <div id="preview-container" className={props.orientClass}>
      <div id="preview-header" className="header">
        <h3>Preview</h3>
      </div>
      <div id='preview-text-container'>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: marked.parse(props.text) }}
        ></div>
      </div>
    </div>
  );
};

const DevInfo = (props) => {
  return (
    <div id="dev-info" className={props.orientation}>
      <div id="line" />
      <p>Yehuda Lehrfield for FreeCodeCamp</p>
      <div id="icons">
        <a
          className="icon-anchor"
          href="https://www.linkedin.com/in/yehudalehrfield"
          target="_blank"
          rel="noreferrer"
        >
          <i className="icon fa-brands fa-linkedin"></i>
        </a>
        <a
          className="icon-anchor"
          href="https://codepen.io/yehudalehrfield/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="icon fa-brands fa-codepen"></i>
        </a>
        <a
          className="icon-anchor"
          href="https://github.com/yehudalehrfield"
          target="_blank"
          rel="noreferrer"
        >
          <i className="icon fa-brands fa-github"></i>
        </a>
        <a
          className="icon-anchor"
          href="mailto:yll2113@columbia.edu"
          target="_blank"
          rel="noreferrer"
        >
          <i className="icon fa-solid fa-envelope"></i>
        </a>
      </div>
    </div>
  );
};

root.render(<App />);

// ReactDOM.render(<App />, document.getElementById("root"))

