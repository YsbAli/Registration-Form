import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://api-reg-form.yousub.live/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");

      // console.log(res.message);
      // alert(res.message);

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="first_Name"
              onChange={handleChange}
              value={data.first_Name}
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_Name"
              onChange={handleChange}
              value={data.last_Name}
              className={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              onChange={handleChange}
              value={data.password}
              className={styles.input}
              required
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
