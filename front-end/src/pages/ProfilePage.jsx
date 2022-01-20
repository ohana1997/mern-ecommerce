import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
// import { getUserDetails } from "../actions/userActions"
// import { listMyOrders } from "../actions/orderActions"
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"

const ProfilePage = ({ location, history }) => {
  const [currentPassWord, setcurrentPassWord] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  //   const { success } = userUpdateProfile
  const success = true

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
    }
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
    }
  }

  return (
    <Row>
      <Col md={6}>
        <h2>Change Password</h2>
        {/* {message && <Message variant="danger">{message}</Message>}
        {}
        {success && <Message variant="success">Profile Updated</Message>} */}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="cureentpassword">
              <Form.Label> Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current Password"
                value={currentPassWord}
                onChange={(e) => setcurrentPassWord(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label> New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  )
}

export default ProfilePage
