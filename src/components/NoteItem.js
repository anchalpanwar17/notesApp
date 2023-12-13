const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 ">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex">
          <h5 className="card-title">{note.title}</h5>
          <i className="bi bi-archive-fill mx-2"></i>
          <i className="bi bi-pencil-square mx-2"></i>
          </div>
          <p className="card-text">{note.description}</p>
          
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
