import React from "react";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    document.title = "Let's Play Bingo! | Contact";
  });
  return (
    <section>
      <div className="row justify-start">
        <div className="col colspan3">
          <h2>Contact</h2>
          <p>Use the form below to contact the developer!</p>
          <form
            name="contactlpb"
            method="post"
            netlify="true">
            <input
              type="hidden"
              name="form-name"
              value="contactlpb"
            />
            <label>
              Name:
              <br />
              <input
                type="text"
                name="name"
              />
            </label>
            <label>
              Email:
              <br />
              <input
                type="email"
                name="email"
              />
            </label>
            <label>
              Message:
              <br />
              <textarea name="message"></textarea>
            </label>
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
