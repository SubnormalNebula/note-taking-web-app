const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const SHOW_NOTES = 'notes/SHOW_NOTES';
const HIDE_NOTES = 'notes/HIDE_NOTES';
const REMOVE = 'notes/REMOVE';
const INSERT = 'notes/INSERT';

const initialState = {
  data: [],
  notebookId: -1
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case SHOW_NOTES: {
      return _.assign(
        {},
        state, {
        data: action.notes,
        notebookId: action.notebookId
      });
    };

    case HIDE_NOTES: {
      if (action.notebookId !== state.notebookId){
        return state;
      };

      return _.assign({}, state, {
        data: [],
        notebookId: -1
      });
    };

    case REMOVE: {
      const data = _.reject(state.data, {id: action.noteId});
      return _.assign({}, state, {data});
    };

    case INSERT: {
      // Combine existing notes with new note
      // Then return updated list of notes
      const data = _.concat(state.data, action.note);
      return _.assign({}, state, {data});
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */

reducer.removeNote = (noteId) => {
  return {type: REMOVE, noteId}
}

reducer.loadNotes = (notebookId) => {
  return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: SHOW_NOTES, notebookId: notebookId, notes: notes });
    }).catch((err) => {
      console.error(err);
    });
  };
};

reducer.unloadNotes = (notebookId) => {
  return {type: HIDE_NOTES, notebookId}
}

reducer.deleteNote = (noteId) => {
  return (dispatch) => {
    api.delete('/notes/' + noteId).then(() => {
      dispatch(reducer.removeNote(noteId));
    }).catch((err) => {
      console.error(err);
    });
  };
}

reducer.createNote = (newNote) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      dispatch(reducer.insertNote([note]));
    }).catch((err) => {
      console.error(err);
    });
  };
};

reducer.insertNote = (note) => {
  return {type: INSERT, note};
};



// Export the action creators and reducer
module.exports = reducer;
