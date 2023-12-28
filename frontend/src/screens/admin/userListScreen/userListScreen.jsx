import React from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../slices/usersApiSlice";
import { toast } from "react-toastify";

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaTimes, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../../components/message/message";
import Loader from "../../../components/loader/loader";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="screen orderlist-screen">
      <h1 className="title-style">Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-wrapper">
          <Table striped hover responsive className="table-sm table-style">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck />
                    ) : (
                      <FaTimes className="x-icon" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button
                        variant="light"
                        className="details-btn btn-sm card-button-style"
                      >
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="details-btn btn-sm card-button-style"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
