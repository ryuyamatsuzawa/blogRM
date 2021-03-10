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
      router.push("/adminPage/userList");
    } else {
      alert(JSON.stringify(json));
    }
  }, []);
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} id="createUser">
            <div className="createContainer">
              <h2>アカウント作成</h2>
              <Field<HTMLInputElement>
                name="name"
                placeholder="name"
                render={(props) => {
                  return (
                    <div className="createFormGroup">
                      <label>名前:</label>
                      <input
                        {...(props.input as any)}
                        style={{ width: "20vw" }}
                        type="text"
                        required
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
                    <div className="createFormGroup">
                      <label>メールアドレス:</label>
                      <input
                        {...(props.input as any)}
                        type="email"
                        style={{ width: "20vw" }}
                        required
                      />
                    </div>
                  );
                }}
              />
              <Field<HTMLInputElement>
                name="password"
                placeholder="password"
                render={(props) => {
                  return (
                    <div className="createFormGroup">
                      <label>パスワード:</label>
                      <input
                        {...(props.input as any)}
                        style={{ width: "20vw" }}
                        type="password"
                        required
                      />
                    </div>
                  );
                }}
              />
              <button type="submit">登録</button>
            </div>
          </form>
        );
      }}
    />
  );
}