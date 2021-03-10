import { useCallback } from "react";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";

export function EditForm() {
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
      router.push("/postedPost");
    } else {
      alert(JSON.stringify(json));
    }
  }, []);
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} id="createPost">
            <div className="createContainer">
            <h2>投稿編集</h2>
              <Field<HTMLInputElement>
                name="title"
                placeholder="title"
                render={(post) => {
                  return (
                    <div className="createFormGroup">
                      <label>タイトル:</label>
                      <input
                        {...(post.input as any)}
                        style={{ width: "20vw" }}
                        type="text"
                        required
                      />
                    </div>
                  );
                }}
              />
              <Field<HTMLTextAreaElement>
                name="content"
                placeholder="content"
                render={(post) => {
                  return (
                    <div className="createFormGroup">
                      <label>内容:</label>
                      <textarea
                        {...(post.input as any)}
                        style={{
                          width: "20vw", height: "100px", alignItems: "center",
                          justifyContent: "center"
                        }}
                      />
                    </div>
                  );
                }}
              />
              <button type="submit">更新</button>
            </div>
          </form>
        );
      }}
    />
  );
}