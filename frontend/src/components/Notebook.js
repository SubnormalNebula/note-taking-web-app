const React = require('react');

class Notebook extends React.Component {
constructor(props) {
    super(props);
  }

  render() {
    const onClickNotebook = (event) => {
      event.preventDefault();
      this.props.loadNotes(this.props.notebook.id);
    };

    return (
    <li className="notebook">
      <a onClick={onClickNotebook} role={"button"}>
        {this.props.notebook.title}
      </a>
    </li>
    );
  }
}

module.exports = Notebook;