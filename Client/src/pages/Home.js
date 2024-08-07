import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import img from '../img/loader.gif';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const king = (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input can't be empty");
    }
    setLoading(true);
    axios.post("https://kingjaweedbackend.onrender.com/create", { name })
      .then((res) => {
        toast.success("Added successfully");
        setLoading(false);
        setName('');
        const newData = res.data.data ? res.data.data : { name };
        setData([...data, newData]); // Assuming the new data is returned in res.data.data or use the input name
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error adding data");
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.get("https://kingjaweedbackend.onrender.com/")
      .then((res) => {
        setData(res.data.data || []); // Ensure res.data.data is an array
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching data");
        setLoading(false);
      });
  }, [backUrl]);

  return (
    <div
      className={`d-flex justify-content-center align-items-center position-relative vh-100 ${loading ? 'bg-secondary' : 'bg-white'}`}
    >
      <ToastContainer />

      {loading ? (
        <img src={img} alt="Loader" />
      ) : (
        <div></div>
      )}

      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 999 }} />
      )}

      <div className="position-absolute top-0 start-0 m-3">
        <div className='text-center mt-5'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={king}>Ok</button>
        </div>
        <table>
          <tbody>
            {data.map((e, i) => (
              <tr key={i}>
                <td className='p-1' style={{ border: "1px solid rgb(1, 48, 124)", textAlign: "center" }}>{i + 1}</td>
                <td className='p-1' style={{ border: "1px solid rgb(1, 48, 124)", textAlign: "center" }}>{e.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
