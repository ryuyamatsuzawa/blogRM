import { useCallback } from "react";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";

export function UserForm() {
  const router = useRouter();
  const onSubmit = useCallback(async (formData) => {
    const res = await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.ok) {
      router.push("/postedUser");
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
              name="name"
              placeholder="name"
              render={(props) => {
                return (
                  <div>
                     <label>名前:</label>
                    <input
                      {...(props.input as any)}
                      style={{ width: "20vw" }}
                    />
                  </div>
                );
              }}
            />
            <Field<HTMLInputElement>
              name="email"
              placeholder="email"
              render={(props) => {
                return (
                  <div>
                     <label>メールアドレス:</label>
                    <input
                      {...(props.input as any)}
                      style={{ width: "20vw" }}
                    />
                  </div>
                );
              }}
            />
            <button type="submit">登録</button>
          </form>
        );
      }}
    />
  );
}