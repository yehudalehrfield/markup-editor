import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {marked} from "marked";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:'',
      verticalOrientation:false,
      editorMax:false,
      previewMax:false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.handleEditorMax = this.handleEditorMax.bind(this);
    this.handlePreviewMax = this.handlePreviewMax.bind(this);
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
  handleEditorMax() {
    this.setState({
      editorMax: !this.state.editorMax
    });
  }
  handlePreviewMax() {
    this.setState({
      previewMax: !this.state.previewMax
    });
  }
  render() {
    let editSizeClass = (this.state.editorMax === true) ? ' maximize' : (this.state.previewMax === true) ? " minimize" : "";
    let prevSizeClass = (this.state.previewMax === true) ? ' maximize' : (this.state.editorMax === true) ? " minimize" : "";
    let editMinMaxIcon = (this.state.editorMax === true) ? ' fa-solid fa-compress' : ' fa-solid fa-expand';
    let prevMinMaxIcon = (this.state.previewMax === true) ? ' fa-solid fa-compress' : ' fa-solid fa-expand';
    
    let classNames = this.state.verticalOrientation
      ? ['appContainer-vertical','fa-solid fa-grip-lines','editor-container-vertical'+editSizeClass,'preview-container-vertical'+prevSizeClass,editMinMaxIcon,prevMinMaxIcon]
      : ['appContainer-horizontal','fa-solid fa-grip-lines-vertical','editor-container-horizontal'+editSizeClass,'preview-container-horizontal'+prevSizeClass,editMinMaxIcon,prevMinMaxIcon];
    console.log('input:' + this.state.input);
    console.log('vertical:' + this.state.verticalOrientation)
    console.log('editMax:' + this.state.editorMax)
    return (
      <div id="app-wrapper">
        <div id="app-container" className={classNames[0]}>
          <div id = "options">
            <button className = "layoutButton" onClick = {this.handleOrientationChange}><i className={classNames[1]}></i></button>
          </div>
          <Editor input={this.state.input} onChange={this.handleEditorChange} orientClass={classNames[2]} editMinMaxIcon = {classNames[4]} editMinMax = {this.handleEditorMax}/>
          <Preview text={this.state.input} orientClass={classNames[3]} prevMinMaxIcon = {classNames[5]} prevMinMax = {this.handlePreviewMax}/>
        </div>
        <DevInfo />
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <div id='editor-container' className={props.orientClass}>
      <div id="editor-header" className="header">
        <h3>Editor</h3>
        <button id="editor-min-max-button" className='action-icon-button' onClick={props.editMinMax}>
          <i id='min-max-icon' className={"header-icon" + props.editMinMaxIcon}></i>
        </button>
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
        <button id="preview-min-max-button" className='action-icon-button' onClick={props.prevMinMax}>
          <i id='min-max-icon' className={"header-icon" + props.prevMinMaxIcon}></i>
        </button>
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
    <div id="dev-info">
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

