import useSWR from 'swr'
import { Data } from "./api/hello"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Hello = () =>  {
  const { data, error } = useSWR<Data>(`/api/hello`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}</div>
  }

  export default Hello;