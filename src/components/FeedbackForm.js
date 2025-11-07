import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message:"" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm( { ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending....");

    try {
      const res = await axios.post("/api/send", form);
      setStatus(res.data.message);
      setForm({ name: "", email: "", message: ""});
    } catch (error) {
      setStatus("Failed to send feedback. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
         type="text" name="name" placeholder="Your Name"
         value={form.name} onChange={handleChange} required
         style={{ display: "block", margin: "8px 0",width:"100%" }}
          />
          <input
         type="email" name="email" placeholder="Your Email"
         value={form.email} onChange={handleChange} required
         style={{ display: "block", margin: "8px 0",width:"100%" }}
          />
          <textarea
          name="message" placeholder="Your Feedback"
          value={form.message} onChange={handleChange} required
          style={{ display: "block", margin: "8px 0",width:"100%" , height: "80px" }}
          />
        <button type="submit">Submit</button>
        </form>
        <p>{status}</p>
        </div>
      );
     };

export default FeedbackForm;