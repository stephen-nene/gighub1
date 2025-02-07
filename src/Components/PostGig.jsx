// src/components/PostGig.jsx
import React, { useState } from "react";
import supabase from "../supabaseClient"; // Create a file for initializing Supabase

const PostGig = () => {
  const [gig, setGig] = useState({
    title: "",
    description: "",
    location: "",
    budget: "",
  });

  const handleChange = (e) => {
    setGig({
      ...gig,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("gigz")
      .insert([{ ...gig }])
      .select();
    if (error) {
      alert("Failed to post gig. Please try again.");
    } else {
      // Optionally update your UI with the new gig data.
      setGig({ title: "", description: "", location: "", budget: "" });
    }
  };

  return (
    <section id="post-gig" className="section">
      <div className="container">
        <h2
          className="deep-purple-text text-darken-3 center-align"
          data-aos="fade-up"
        >
          Post a Gig
        </h2>
        <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
          <div className="input-field">
            <input
              type="text"
              id="title"
              value={gig.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="title">Gig Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="description"
              className="materialize-textarea"
              value={gig.description}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">Gig Description</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              id="location"
              value={gig.location}
              onChange={handleChange}
              required
            />
            <label htmlFor="location">Location</label>
          </div>
          <div className="input-field">
            <input
              type="number"
              id="budget"
              value={gig.budget}
              onChange={handleChange}
              required
            />
            <label htmlFor="budget">Budget ($)</label>
          </div>
          <button
            type="submit"
            className="btn waves-effect waves-light deep-purple darken-3"
          >
            Post Gig <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostGig;
