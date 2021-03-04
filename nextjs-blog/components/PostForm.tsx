import { useCallback } from "react";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";

export function PostForm() {
  const router = useRouter();
  const onSubmit = useCallback(async (formData) => {
    const res = await fetch("/api/createPost", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.ok) {
      router.push("/");
    } else {
      alert(JSON.stringify(json));
    }
  }, []);
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field<HTMLInputElement>
              name="title"
              placeholder="title"
              render={(props) => {
                return (
                  <div>
                     <label>タイトル:</label>
                    <input
                      {...(props.input as any)}
                      style={{ width: "40vw" }}
                    />
                  </div>
                );
              }}
            />
            <Field<HTMLTextAreaElement>
              name="content"
              placeholder="content"
              render={(props) => {
                return (
                  <div>
                     <label>内容:</label>
                    <textarea
                      {...(props.input as any)}
                      style={{ width: "40vw", height: "200px" }}
                    />
                  </div>
                );
              }}
            />
            <button type="submit">Submit</button>
          </form>
        );
      }}
    />
  );
}