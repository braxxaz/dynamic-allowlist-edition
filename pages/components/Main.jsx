import { StylesProvider } from "@material-ui/core"
import React from "react"

const Main = () => {
  return (
<div dangerouslySetInnerHTML={{ __html: `
  <video src={"https://website-braxxaz.s3.us-east-2.amazonaws.com/nfts+intro+web.mp4 autoPlay loop muted playsInline type='video/mp4' class="[${'video'}]" />,
` }}></div>
  )
}

export default Main