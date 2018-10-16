const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');

const Notebook = require('./Notebook')
const ActiveNotebook = require('./ActiveNotebook')

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

class NotebookList extends React.Component {

  render() {
    const createNotebookListItem = (notebook) => {
      if(notebook.id === this.props.activeNotebookId){
        return (
          <ActiveNotebook
            key = {notebook.id}
            notebook = {notebook}
            notes = {this.props.notes}
          />
        );
      }
      return (
        <Notebook
          key = {notebook.id}
          notebook = {notebook}
          loadNotes = {this.props.loadNotes}
        />
      );
    };

    return (
      <div>
        <h2>Notebooks</h2>
        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
