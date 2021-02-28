import type { NextApiRequest, NextApiResponse } from 'next'

export interface Data {
  name: string
}

// res.status(200)の数字は、数字ごとに情報が入っていて、200は成功レスポンスのOKということ。

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' })
}