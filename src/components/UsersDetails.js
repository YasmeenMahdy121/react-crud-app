import "./Styles/UsersDetails.scss";
const UsersDetails = (props) => {
  // distruct props
  const { displayUpdateForm, displayConfirmDeleteForm, searchKeyword } = props;
  let users = "";
  // all users
  if (searchKeyword === "") {
    users = props.users.map((user) => {
      return (
        <tr key={user.id}>
          <th scope="row">
            <img src={user.avatar}></img>
          </th>
          <td className="user-name">{user.first_name}</td>
          <td className="user-name">{user.last_name}</td>
          <td>{user.email}</td>
          <td>
            <button
              className="btn btns me-3"
              onClick={() => displayUpdateForm(user)}
            >
              Update
            </button>
            <button
              className="btn btns bg-danger text-white"
              onClick={() => displayConfirmDeleteForm(user)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  // users searched for
  else {
    users = props.users.map((user) => {
      if (
        user.first_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchKeyword.toLowerCase())
      ) {
        return (
          <tr key={user.id}>
            <th scope="row">
              <img src={user.avatar}></img>
            </th>
            <td className="user-name">{user.first_name}</td>
            <td className="user-name">{user.last_name}</td>
            <td>{user.email}</td>
            <td>
              <button
                className="btn btns p-2 px-3 me-3"
                onClick={() => displayUpdateForm(user)}
              >
                Update
              </button>
              <button
                className="btn btns bg-danger p-2 px-3 text-white"
                onClick={() => displayConfirmDeleteForm(user)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }
    });
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
  );
};

export default UsersDetails;
