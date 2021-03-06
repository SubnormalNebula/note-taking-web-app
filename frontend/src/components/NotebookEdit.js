const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
constructor(props) {
    super(props);
    const notebook = props.notebook || {};

    this.state = {
      title: notebook.title || ''
    };
  }

  render() {
    // Function to cancel notebook creation
    const revertAndStopEditing = (event) => {
      this.props.onCancel();
    };

    // Fucntion to save notebook
    const submitAndStopEditing = (event) => {
      //create an object to send to redux store
      const newNotebook = _.assign({}, this.props.notebook, {
        title: this.state.title
      });
      this.props.onSave(newNotebook);
    };

    // Function to set state.title to content of input field
    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    return(
      <div>
        {/* Title field */}
        <input className="form-control" value={this.state.title}
          placeholder="Notebook title..." onChange={onTitleChange}
        />
        <span>
        {/* Save button */}
        <button className="btn btn-success" onClick={submitAndStopEditing}>
          <i className="fa fa-check"/>
        </button>

        {/* Cancel button */}
        <button className="btn btn-default"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}>
          Cancel
       </button>
       </span>
      </div>
    )
  }
}

module.exports = NotebookEdit;