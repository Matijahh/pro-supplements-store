import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../../slices/usersApiSlice";

import { Form, Button } from "react-bootstrap";
import Message from "../../../components/message/message";
import Loader from "../../../components/loader/loader";
import FormContainer from "../../../components/formContainer/formContainer";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      });
      toast.success("User updated succesfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <div className="screen">
      <Link
        to="/admin/userlist"
        className="btn btn-light my-3 regular-button-style"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className="title-style">Edit Users</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="my-2 regular-button-style"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
